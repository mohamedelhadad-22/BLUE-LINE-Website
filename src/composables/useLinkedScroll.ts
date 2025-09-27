// src/composables/useLinkedScroll.ts
type Opts = {
  inner: HTMLElement; // .accordionSlider__content
  sectionEl: HTMLElement; // section#services
  wheelScale?: number; // قوة العجلة
  easingMs?: number; // غير مستخدمة هنا (السناب داخل ServicesSection)
};

export function useLinkedScroll({ inner, sectionEl, wheelScale = 1.05 }: Opts) {
  const vh = () => window.innerHeight || document.documentElement.clientHeight;

  const inView = () => {
    const r = sectionEl.getBoundingClientRect();
    return r.top < vh() && r.bottom > 0;
  };

  const atTop = () => inner.scrollTop <= 1;
  const atBottom = () =>
    Math.ceil(inner.scrollTop + inner.clientHeight) >= inner.scrollHeight - 1;

  // نسمع لعجلة وتاتش في "القسم" نفسه (مش على window)
  const onWheel = (e: WheelEvent) => {
    if (!inView()) return;
    const dy = e.deltaY || 0;

    // لو في مساحة للتمرير داخل العمود، امنع تمرير الصفحة وحرك الداخل
    const canDown = dy > 0 && !atBottom();
    const canUp = dy < 0 && !atTop();

    if (canDown || canUp) {
      e.preventDefault();
      e.stopPropagation();
      inner.scrollTop = Math.max(
        0,
        Math.min(
          inner.scrollHeight - inner.clientHeight,
          inner.scrollTop + dy * wheelScale
        )
      );
    }
    // لو مفيش مساحة (في القاع أو القمة)، سيب الحدث يطلع للصفحة عادي
  };

  // سوايب لمس بسيط لتوجيه التمرير للداخل فقط
  let startY = 0;
  const onTouchStart = (e: TouchEvent) => {
    if (!inView()) return;
    startY = e.touches[0]?.clientY ?? 0;
  };
  const onTouchMove = (e: TouchEvent) => {
    if (!inView()) return;
    const y = e.touches[0]?.clientY ?? startY;
    const dy = startY - y;
    const canDown = dy > 0 && !atBottom();
    const canUp = dy < 0 && !atTop();
    if (canDown || canUp) {
      e.preventDefault();
      inner.scrollTop = Math.max(
        0,
        Math.min(inner.scrollHeight - inner.clientHeight, inner.scrollTop + dy)
      );
      startY = y;
    }
  };

  // اربط على الـ section مش على window
  sectionEl.addEventListener("wheel", onWheel as EventListener, {
    passive: false,
  });
  sectionEl.addEventListener("touchstart", onTouchStart, { passive: true });
  sectionEl.addEventListener("touchmove", onTouchMove, { passive: false });

  // Cleanup
  return () => {
    sectionEl.removeEventListener("wheel", onWheel as EventListener);
    sectionEl.removeEventListener("touchstart", onTouchStart);
    sectionEl.removeEventListener("touchmove", onTouchMove);
  };
}

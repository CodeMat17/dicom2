"use client";

// Drives every `data-reveal` entrance on the page from one observer.
//
// The hidden start state lives behind `html[data-reveal-ready]`, which is set
// here — so if this never runs (no JavaScript, or a chunk that fails to load)
// the page renders fully visible rather than blank. Elements are unobserved
// once shown, so scrolling costs nothing after the first pass.
import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      },
      // Fire a little before the element is fully on screen, matching the
      // -80px viewport margin the previous motion config used.
      { rootMargin: "0px 0px -80px 0px", threshold: 0 }
    );

    const seen = new WeakSet<Element>();

    const register = (el: Element, immediate: boolean) => {
      if (seen.has(el)) return;
      seen.add(el);
      if (immediate) {
        // Already painted where the visitor can see it. Marking it before the
        // hidden state is armed means it never flickers out and back in — and
        // the first screen is never animated after the fact.
        el.classList.add("in-view");
        return;
      }
      observer.observe(el);
    };

    const viewport = window.innerHeight;
    for (const el of document.querySelectorAll("[data-reveal]")) {
      register(el, el.getBoundingClientRect().top < viewport);
    }

    root.setAttribute("data-reveal-ready", "");

    // Client-rendered islands (the gallery wall, dialogs) add nodes after the
    // first pass; pick those up without re-scanning on every scroll frame.
    const mutations = new MutationObserver(() => {
      for (const el of document.querySelectorAll("[data-reveal]")) {
        register(el, false);
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      root.removeAttribute("data-reveal-ready");
    };
  }, []);

  return null;
}

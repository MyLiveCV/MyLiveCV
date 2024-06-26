import "./../styles/builder.css";

import { useBreakpoint } from "@reactive-resume/hooks";
import { SectionKey } from "@reactive-resume/schema";
import { BuilderArtBoardEventType, pageSizeMap, Template } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useRef } from "react";
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import { MM_TO_PX, Page } from "../components/page";
import { useArtboardStore } from "../store/artboard";
import { getTemplate } from "../templates";

export const BuilderLayout = () => {
  const transformRef = useRef<ReactZoomPanPinchRef>(null);
  const containterRef = useRef<HTMLDivElement | null>(null);
  const format = useArtboardStore((state) => state.resume.metadata.page.format);
  const layout = useArtboardStore((state) => state.resume.metadata.layout);
  const template = useArtboardStore((state) => state.resume.metadata.template as Template);
  const { isMobile, isTablet } = useBreakpoint();

  const Template = useMemo(() => getTemplate(template), [template]);

  const animate = (selector: string) => {
    const section = containterRef.current?.querySelector(selector);
    section?.classList.add("wiggle");
    setTimeout(() => {
      section?.classList.remove("wiggle");
    }, 2000);
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data.type === BuilderArtBoardEventType.ZOOM_IN) transformRef.current?.zoomIn(0.2);
      if (event.data.type === BuilderArtBoardEventType.ZOOM_OUT) transformRef.current?.zoomOut(0.2);
      if (event.data.type === BuilderArtBoardEventType.CENTER_VIEW)
        transformRef.current?.centerView();
      if (event.data.type === BuilderArtBoardEventType.RESET_VIEW) {
        transformRef.current?.resetTransform(0);
        setTimeout(() => transformRef.current?.centerView(getInitialZoom(), 0), 10);
      }
      if (event.data.type === BuilderArtBoardEventType.HIGHLIGHT) {
        animate(event.data.section);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [transformRef]);

  const getInitialZoom = () => {
    if (isMobile) {
      return 0.5;
    } else if (isTablet) {
      return 0.7;
    } else {
      return 0.8;
    }
  };

  return (
    <TransformWrapper
      centerOnInit
      maxScale={2}
      minScale={0.4}
      initialScale={getInitialZoom()}
      ref={transformRef}
      limitToBounds={false}
    >
      <TransformComponent
        wrapperClass="!w-screen !h-screen"
        contentClass="grid items-start justify-center space-x-12 pointer-events-none"
        contentStyle={{
          width: `${layout.length * (pageSizeMap[format].width * MM_TO_PX + 42)}px`,
          gridTemplateColumns: `repeat(${layout.length}, 1fr)`,
        }}
      >
        <AnimatePresence>
          <div ref={containterRef}>
            {layout.map((columns, pageIndex) => (
              <motion.div
                layout
                key={pageIndex}
                initial={{ opacity: 0, x: -200, y: 0 }}
                animate={{ opacity: 1, x: 0, transition: { delay: pageIndex * 0.3 } }}
                exit={{ opacity: 0, x: -200 }}
              >
                <Page mode="builder" pageNumber={pageIndex + 1}>
                  <Template isFirstPage={pageIndex === 0} columns={columns as SectionKey[][]} />
                </Page>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </TransformComponent>
    </TransformWrapper>
  );
};

import React, { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles
} from 'lucide-react';
import badgeFront from './assets/badge-front.webp';
import bellonaCoverClean from './assets/bellona-cover-clean.webp';
import profileEditorial from './assets/profile-final.webp';
import wechatQr from './assets/contact/wechat-qr.webp';
import xiaohongshuQr from './assets/contact/xiaohongshu-qr.webp';
import BorderGlow from './BorderGlow';
import PillNav from './PillNav';
import TiltedCard from './TiltedCard';
import './styles.css';

const ColorBends = lazy(() => import('./ColorBends'));
const Lanyard = lazy(() => import('./Lanyard'));

const bellonaPages = Object.entries(
  import.meta.glob('./assets/bellona/*.jpg', { eager: true, import: 'default' })
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, page]) => page);

const ganbeiPages = Object.entries(
  import.meta.glob('./assets/ganbei/*.jpg', { eager: true, import: 'default' })
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, page]) => page);

const navItems = ['经历', '项目', '联系'];
const pillNavItems = navItems.map((item) => ({ label: item, href: `#${item}` }));

const projects = [
  {
    id: '01',
    title: 'Bellona\n品牌视觉升级',
    type: '医美/vi/包装',
    meta: '百洛娜品牌识别、包装系统与商业物料延展',
    className: 'project-medical',
    cover: bellonaCoverClean,
    pages: bellonaPages
  },
  {
    id: '02',
    title: '乾杯醺茶\n品牌视觉',
    type: '茶饮 / 国风 / 品牌',
    meta: '乾杯醺茶品牌视觉系统与国风茶饮场景延展',
    className: 'project-ai',
    cover: ganbeiPages[0],
    pages: ganbeiPages
  },
  {
    id: '03',
    title: 'Corporate Visual Design',
    type: '品牌宣传 / 活动物料 / UI',
    meta: '集团内外宣与产品界面支持',
    className: 'project-corp'
  },
  {
    id: '04',
    title: 'Beauty Packaging',
    type: '包装系统 / 礼盒 / 陈列',
    meta: '护肤品包装与终端展示延展',
    className: 'project-packaging'
  },
  {
    id: '05',
    title: 'Social Media Kit',
    type: '小红书 / 公众号 / 内容栏目',
    meta: '社媒视觉模板与运营内容体系',
    className: 'project-social'
  },
  {
    id: '06',
    title: 'Event Visuals',
    type: '展会主视觉 / 物料 / 美陈',
    meta: '活动场景视觉与线下物料落地',
    className: 'project-event'
  }
];

const profileCards = [
  ['FOCUS', '品牌视觉体系', 'VI 规范、包装延展、线下物料与新媒体内容统一管理。'],
  ['METHOD', 'AI + 视觉执行', '用 AI 提升概念发散效率，同时保留人工审美判断与落地控制。'],
  ['STYLE', '克制 / 清晰 / 商业化', '偏好有秩序、有质感、能被真实业务持续使用的视觉表达。']
];

const timeline = [
  {
    date: '2025.09-至今',
    company: '韩国（株）G-MED',
    role: '品牌设计',
    intro: '负责医美护肤品牌的视觉系统搭建与商业化落地，将品牌调性、产品卖点、合规表达和终端使用场景统一到可持续复用的设计语言中。',
    points: ['主导 Bellona 百洛娜、Opacious 欧泊等品牌的 VI 延展、包装视觉、产品卖点页与终端物料输出，建立统一的画面风格和资产规范。', '覆盖展会主视觉、终端陈列、新媒体内容、宣传手册、海报、销售辅助物料与产品教育内容，形成从品牌认知到销售转化的完整视觉链路。', '结合医美护肤行业合规要求、成分表达和审美趋势，平衡专业感、信任感与高级感，提升品牌在不同渠道中的识别度。', '持续整理视觉模板、包装规范和常用素材，降低重复沟通成本，让后续物料可以快速延展并保持统一。']
  },
  {
    date: '2024.05-2025.06',
    company: '青岛漫斯特科技有限公司',
    role: '视觉设计师',
    intro: '面向集团及多业务线提供视觉支持，在品牌宣传、产品界面、新媒体传播与 AI 创意探索之间建立统一输出标准。',
    points: ['负责集团内外宣视觉、活动主视觉、运营海报、LOGO 与 VI 基础规范设计，保证不同业务线对外表达的一致性。', '参与 APP / 小程序 UI 页面、功能图标、营销页面与产品信息视觉梳理，让复杂功能以更清晰的视觉层级呈现。', '将 AI 工具引入海报创意、KV 草图、概念发散和风格预演流程，提高前期提案效率，并减少方向试错成本。', '配合运营、产品和业务团队完成高频物料交付，沉淀可复用版式与图片风格，提升日常设计响应速度。']
  },
  {
    date: '2022.02-2024.05',
    company: '青岛杠上开花科技有限公司',
    role: '视觉设计师',
    intro: '长期承担企业品牌传播与日常视觉资产建设，兼顾商务场景、内部文化、节日营销和文创产品的完整视觉交付。',
    points: ['完成企业宣传物料、商务 PR 图、品牌手册、公众号视觉、节日海报与招聘宣传等高频设计需求。', '参与 VI 系统维护、礼盒包装、文创产品、活动物料与人事文化内容设计，让品牌在内外部场景中保持统一气质。', '在多部门协作中沉淀可复用模板和版式规范，减少临时需求带来的风格波动，提升团队整体交付效率。', '根据不同传播渠道调整视觉密度和信息层级，让商务、社媒、内部文化三类内容拥有各自合适的表达方式。']
  },
  {
    date: '2020.07-2021.06',
    company: '新百丽鞋业（深圳）有限公司',
    role: '鞋设计师',
    intro: '从产品设计与材料研究切入商业设计，积累了趋势判断、品类调研、结构审美与产品落地意识。',
    points: ['负责时尚品牌新品资讯收集、趋势分析、鞋款造型草图与研发方向整理，观察流行趋势如何转化为具体产品语言。', '跟进鞋品材料、色彩、工艺、版型与市场反馈，为新品开发提供视觉与产品参考。', '在产品开发流程中理解成本、材料、结构、用户偏好和渠道陈列之间的关系，形成更务实的设计判断。', '这段经历让后续品牌和平面工作更关注真实生产、真实销售与真实使用场景，而不是单纯追求画面效果。']
  }
];

function App() {
  const [isNavFloating, setIsNavFloating] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [expandedExperience, setExpandedExperience] = useState(0);
  const [loadProgress, setLoadProgress] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [heroEffectsReady, setHeroEffectsReady] = useState(false);
  const [lanyardReady, setLanyardReady] = useState(false);
  const [criticalAssetsReady, setCriticalAssetsReady] = useState(false);
  const [lanyardVisualReady, setLanyardVisualReady] = useState(false);
  const [loadSafetyReleased, setLoadSafetyReleased] = useState(false);
  const siteCursorRef = useRef(null);
  const loaderStartedAtRef = useRef(performance.now());
  const loadProgressRef = useRef(1);
  const loadFinishStartedAtRef = useRef(null);
  const loadFinishFromRef = useRef(1);
  const loaderHiddenRef = useRef(false);

  useLayoutEffect(() => {
    if (!isLoading) return undefined;

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const body = document.body;
    const previous = {
      htmlOverflow: html.style.overflow,
      htmlOverscrollBehavior: html.style.overscrollBehavior,
      htmlScrollBehavior: html.style.scrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscrollBehavior: body.style.overscrollBehavior,
      bodyTouchAction: body.style.touchAction,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width
    };
    const blockedKeys = new Set([
      'ArrowDown', 'ArrowUp', 'End', 'Home', 'PageDown', 'PageUp', 'Space'
    ]);
    const preventScroll = (event) => event.preventDefault();
    const preventKeyboardScroll = (event) => {
      if (blockedKeys.has(event.code) || blockedKeys.has(event.key)) event.preventDefault();
    };

    html.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    body.style.overflow = 'hidden';
    body.style.overscrollBehavior = 'none';
    body.style.touchAction = 'none';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeyboardScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyboardScroll);
      html.style.overflow = previous.htmlOverflow;
      html.style.overscrollBehavior = previous.htmlOverscrollBehavior;
      html.style.scrollBehavior = 'auto';
      body.style.overflow = previous.bodyOverflow;
      body.style.overscrollBehavior = previous.bodyOverscrollBehavior;
      body.style.touchAction = previous.bodyTouchAction;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.width = previous.bodyWidth;
      window.scrollTo(0, scrollY);
      html.style.scrollBehavior = previous.htmlScrollBehavior;
    };
  }, [isLoading]);

  useEffect(() => {
    let frame = null;
    let hideTimer = null;

    const updateDisplayedProgress = (value) => {
      const next = Math.max(loadProgressRef.current, Math.min(100, Math.floor(value)));
      if (next === loadProgressRef.current) return;
      loadProgressRef.current = next;
      setLoadProgress(next);
    };

    const animateProgress = (now) => {
      if (loadFinishStartedAtRef.current === null) {
        const elapsed = now - loaderStartedAtRef.current;
        let target;
        if (elapsed < 1300) target = 1 + (elapsed / 1300) * 78;
        else if (elapsed < 2800) target = 79 + ((elapsed - 1300) / 1500) * 16;
        else target = 95 + Math.min(2, (elapsed - 2800) / 1400);
        updateDisplayedProgress(target);
      } else {
        const elapsed = now - loadFinishStartedAtRef.current;
        const start = loadFinishFromRef.current;
        if (elapsed < 480) {
          const eased = 1 - Math.pow(1 - elapsed / 480, 3);
          updateDisplayedProgress(start + (96 - start) * eased);
        } else if (elapsed < 820) updateDisplayedProgress(97);
        else if (elapsed < 1160) updateDisplayedProgress(98);
        else if (elapsed < 1500) updateDisplayedProgress(99);
        else {
          updateDisplayedProgress(100);
          if (!loaderHiddenRef.current) {
            loaderHiddenRef.current = true;
            hideTimer = window.setTimeout(() => setIsLoading(false), 180);
          }
          frame = null;
          return;
        }
      }
      frame = requestAnimationFrame(animateProgress);
    };

    frame = requestAnimationFrame(animateProgress);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      if (hideTimer !== null) window.clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const safetyTimer = window.setTimeout(() => {
      if (cancelled) return;
      setCriticalAssetsReady(true);
      setLoadSafetyReleased(true);
    }, 8000);
    const preloadImage = (src) => new Promise((resolve) => {
      const image = new Image();
      const finish = () => resolve();
      image.onload = () => {
        if (image.decode) image.decode().catch(() => {}).finally(finish);
        else finish();
      };
      image.onerror = finish;
      image.src = src;
    });

    const colorBendsTask = import('./ColorBends').then(() => {
      if (!cancelled) setHeroEffectsReady(true);
    });
    const lanyardTask = import('./Lanyard').then(() => {
      if (!cancelled) setLanyardReady(true);
    });

    Promise.allSettled([
      colorBendsTask,
      lanyardTask,
      preloadImage(badgeFront),
      preloadImage(profileEditorial)
    ]).then(() => {
      if (cancelled) return;
      setCriticalAssetsReady(true);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(safetyTimer);
    };
  }, []);

  useEffect(() => {
    if (!criticalAssetsReady || (!lanyardVisualReady && !loadSafetyReleased)) return undefined;
    if (loadFinishStartedAtRef.current === null) {
      loadFinishFromRef.current = loadProgressRef.current;
      loadFinishStartedAtRef.current = performance.now();
    }
    return undefined;
  }, [criticalAssetsReady, lanyardVisualReady, loadSafetyReleased]);

  useEffect(() => {
    const cursor = siteCursorRef.current;
    if (!cursor || window.matchMedia('(pointer: coarse)').matches) return undefined;

    let frame = null;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const renderCursor = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        frame = requestAnimationFrame(renderCursor);
      } else {
        frame = null;
      }
    };
    const handleMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.classList.toggle('isActive', Boolean(event.target.closest('a, button')));
      if (frame === null) frame = requestAnimationFrame(renderCursor);
    };
    const showCursor = () => cursor.classList.add('isVisible');
    const hideCursor = () => {
      cursor.classList.remove('isVisible', 'isActive');
    };

    document.addEventListener('pointerenter', showCursor);
    document.addEventListener('pointermove', handleMove);
    document.documentElement.addEventListener('pointerleave', hideCursor);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      document.removeEventListener('pointerenter', showCursor);
      document.removeEventListener('pointermove', handleMove);
      document.documentElement.removeEventListener('pointerleave', hideCursor);
    };
  }, []);

  const openProject = async (project) => {
    if (!project.pages?.length) return;
    await Promise.all(project.pages.slice(0, 2).map((src) => new Promise((resolve) => {
      const image = new Image();
      const finish = () => resolve();
      image.onload = () => {
        if (image.decode) image.decode().catch(() => {}).finally(finish);
        else finish();
      };
      image.onerror = finish;
      image.src = src;
    })));
    setActiveProject(project);
  };

  const closeProject = () => {
    setActiveProject(null);
  };

  useEffect(() => {
    let navFrame = null;
    const updateNav = () => {
      navFrame = null;
      setIsNavFloating(window.scrollY >= window.innerHeight - 100);
    };

    const scheduleNavUpdate = () => {
      if (navFrame === null) navFrame = requestAnimationFrame(updateNav);
    };

    updateNav();
    window.addEventListener('scroll', scheduleNavUpdate, { passive: true });
    window.addEventListener('resize', scheduleNavUpdate);
    return () => {
      if (navFrame !== null) cancelAnimationFrame(navFrame);
      window.removeEventListener('scroll', scheduleNavUpdate);
      window.removeEventListener('resize', scheduleNavUpdate);
    };
  }, []);

  useEffect(() => {
    if (!activeProject && !isContactOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeProject, isContactOpen]);

  useEffect(() => {
    if (isLoading) return undefined;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      const curtain = document.querySelector('.openingCurtain');
      if (curtain) {
        curtain.style.opacity = '0';
        curtain.style.visibility = 'hidden';
        curtain.style.clipPath = 'inset(0 0 100% 0)';
      }
      return undefined;
    }
    let disposed = false;
    let ctx;
    let openingFallback;

    const initialiseAnimations = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger')
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
      const finishOpening = () => {
        gsap.set('.openingCurtain', { autoAlpha: 0, clipPath: 'inset(0 0 100% 0)' });
        gsap.set('.heroBackdropTitle', { y: 0, scaleX: 1, clipPath: 'inset(0 0 0% 0)' });
        gsap.set('.nav, .heroTopline span, .heroIntroBlock > *, .heroLanyard, .heroMetrics div, .heroActionsNew', {
          x: 0,
          y: 0,
          xPercent: 0,
          scale: 1,
          autoAlpha: 1,
          clipPath: 'inset(0 0 0% 0)'
        });
        gsap.set('.heroLanyard', { xPercent: -50 });
      };

      openingFallback = window.setTimeout(finishOpening, 3500);
      gsap.set('.openingCurtain', { autoAlpha: 1 });
      gsap.set('.heroBackdropTitle', {
        transformOrigin: 'left center',
        clipPath: 'inset(0 100% 0 0)',
        scaleX: 0.62,
        y: 120
      });
      gsap.set('.heroIntroBlock > *', { y: 44, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)' });
      gsap.set('.heroLanyard', { xPercent: -50, y: -520, autoAlpha: 0, scale: 0.98, rotate: -2 });
      gsap.set('.heroMetrics div', { x: 70, autoAlpha: 0 });
      gsap.set('.heroTopline span, .nav', { y: -24, autoAlpha: 0 });
      gsap.set('.heroActionsNew', { y: 28, autoAlpha: 0 });

      gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: () => {
          window.clearTimeout(openingFallback);
          gsap.set('.openingCurtain', { autoAlpha: 0 });
        }
      })
        .to('.openingCurtain', {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1.2,
          ease: 'expo.inOut',
          delay: 0.1
        })
        .to('.heroBackdropTitle', {
          clipPath: 'inset(0 0% 0 0)',
          scaleX: 1,
          y: 0,
          duration: 1.35,
          ease: 'expo.out'
        }, '-=0.52')
        .to('.nav, .heroTopline span', {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.08
        }, '-=1.1')
        .to('.heroIntroBlock > *', {
          y: 0,
          autoAlpha: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.05,
          stagger: 0.08
        }, '-=0.74')
        .to('.heroLanyard', {
          xPercent: -50,
          y: 0,
          autoAlpha: 1,
          rotate: 0,
          scale: 1,
          duration: 1.55,
          ease: 'expo.out'
        }, '-=1')
        .to('.heroMetrics div', {
          x: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.11
        }, '-=0.9')
        .to('.heroActionsNew', {
          y: 0,
          autoAlpha: 1,
          duration: 0.85
        }, '-=0.5');

      gsap.to('.heroBackdropTitle', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.1
        }
      });

      const animatedSections = [...gsap.utils.toArray('.section'), document.querySelector('.finalContact')].filter(Boolean);
      animatedSections.forEach((section) => {
        const title = section.querySelector('.sectionHead h2, .statement h2, .about h2, .finalContact h2');
        const label = section.querySelector('.sectionLabel');
        const cards = section.querySelectorAll('.projectGlowCard, .profileStaticCard, .timelineStackCard, .strengthGlowCard');
        const images = section.querySelectorAll('.portraitCard, .projectImage');

        if (label) {
          gsap.fromTo(label, { y: 44, autoAlpha: 0 }, {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 78%', once: true }
          });
        }

        if (title) {
          gsap.fromTo(title, {
            y: 120,
            scaleX: 0.78,
            autoAlpha: 0,
            clipPath: 'inset(0 0 100% 0)',
            transformOrigin: 'left center'
          }, {
            y: 0,
            scaleX: 1,
            autoAlpha: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.18,
            ease: 'expo.out',
            scrollTrigger: { trigger: section, start: 'top 74%', once: true }
          });
        }

        if (cards.length) {
          gsap.fromTo(cards, {
            y: 90,
            autoAlpha: 0,
            clipPath: 'inset(16% 0 0 0)'
          }, {
            y: 0,
            autoAlpha: 1,
            clipPath: 'inset(0% 0 0 0)',
            duration: 1,
            ease: 'power3.out',
            stagger: 0.09,
            scrollTrigger: { trigger: section, start: 'top 68%', once: true }
          });
        }

        images.forEach((image) => {
          gsap.fromTo(image, {
            clipPath: 'inset(0 0 100% 0)',
            y: 70
          }, {
            clipPath: 'inset(0 0 0% 0)',
            y: 0,
            duration: 1.08,
            ease: 'expo.out',
            scrollTrigger: { trigger: image, start: 'top 80%', once: true }
          });
        });
      });

      const isTouchLayout = window.matchMedia('(pointer: coarse), (max-width: 768px)').matches;
      if (!isTouchLayout) {
        gsap.to('.portraitCard img', {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        });
      }

      gsap.to('.timelineRail', {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.experienceTimeline',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.3
        }
      });
      });
    };

    initialiseAnimations();

    return () => {
      disposed = true;
      window.clearTimeout(openingFallback);
      ctx?.revert();
    };
  }, [isLoading]);

  return (
    <main>
      <div className={`siteLoader ${isLoading ? 'isVisible' : 'isComplete'}`} aria-hidden={!isLoading}>
        <div className="siteLoaderBrand">CBZ.</div>
        <div className="siteLoaderCount">{String(loadProgress).padStart(3, '0')}</div>
        <div className="siteLoaderTrack">
          <span style={{ transform: `scaleX(${loadProgress / 100})` }} />
        </div>
        <div className="siteLoaderMeta">
          <span>LOADING PORTFOLIO</span>
          <span>{loadProgress}%</span>
        </div>
      </div>
      <div className="siteCursor" ref={siteCursorRef} aria-hidden="true" />
      <div className="openingCurtain" aria-hidden="true" />
      <section className="hero" id="top">
        {heroEffectsReady && (
          <Suspense fallback={null}>
            <ColorBends
              className="heroColorBends"
              colors={['#a91d22']}
              rotation={90}
              autoRotate={4}
              speed={0.72}
              scale={1}
              frequency={1}
              warpStrength={1}
              mouseInfluence={1.45}
              noise={0.12}
              parallax={0.5}
              iterations={2}
              intensity={1}
              bandWidth={6.5}
              transparent
            />
          </Suspense>
        )}
        <nav className={`nav ${isNavFloating ? 'isFloating' : ''}`}>
          <PillNav
            items={pillNavItems}
            activeHref="#top"
            baseColor="#f3f1eb"
            pillColor="rgba(8, 8, 8, 0.72)"
            hoveredPillTextColor="#080808"
            pillTextColor="#f3f1eb"
            ease="power3.out"
          />
          <button className="outlineButton contactDialogTrigger" type="button" onClick={() => setIsContactOpen(true)}>
            联系我 <ArrowUpRight size={16} />
          </button>
        </nav>

        <div className="heroStage">
          <div className="heroTopline">
            <span><strong>VISUAL DESIGNER</strong><br />AI DESIGNER / BRAND CREATOR</span>
            <span>AVAILABLE FOR FREELANCE <Sparkles size={15} /></span>
          </div>

          <div className="heroBackdropTitle" aria-hidden="true">PORTFOLIO</div>

          <div className="heroIntroBlock">
            <p className="scriptText">Hello, I'm</p>
            <h1>CHEN<br />BOZHI</h1>
            <h2>视觉设计师 &<br />AI / 品牌设计师</h2>
            <p>
              我专注品牌视觉体系、包装设计、新媒体视觉与AI辅助创意，把克制的审美转化为可落地的商业表达。
            </p>
            <div className="heroAvailability">
              <Globe2 size={16} />
              <span>AVAILABLE WORLDWIDE</span>
            </div>
          </div>

          <div className="heroLanyard" aria-label="陈博智设计师挂绳身份牌">
            {!lanyardVisualReady && (
              <img className="heroLanyardFallback" src={badgeFront} alt="陈博智设计师身份牌" decoding="async" />
            )}
            {lanyardReady && (
              <Suspense fallback={null}>
                <Lanyard
                  position={[0, 0, 10]}
                  fov={34}
                  frontImage={badgeFront}
                  imageFit="cover"
                  onReady={() => setLanyardVisualReady(true)}
                />
              </Suspense>
            )}
          </div>

          <div className="heroMetrics">
            <div>
              <strong>6+</strong>
              <span>YEARS<br />EXPERIENCE</span>
            </div>
            <div>
              <strong>95%</strong>
              <span>PRODUCT<br />FEEDBACK</span>
            </div>
            <div>
              <strong>AI+</strong>
              <span>DESIGN<br />WORKFLOW</span>
            </div>
          </div>

          <div className="heroActions heroActionsNew">
            <a className="solidButton" href="#项目">查看项目 <ArrowRight size={17} /></a>
            <a className="textButton" href="mailto:374428307@qq.com">374428307@qq.com</a>
          </div>
        </div>
      </section>

      <section className="about section" id="经历">
        <div className="sectionLabel">PROFILE</div>
        <div className="aboutGrid">
          <TiltedCard
            containerHeight="460px"
            containerWidth="100%"
            rotateAmplitude={14}
            scaleOnHover={1.08}
          >
            <div className="portraitCard">
              <img src={profileEditorial} alt="陈博智个人视觉大片照片" loading="eager" fetchPriority="high" decoding="async" />
              <div className="portraitTiltLabel" aria-hidden="true">
                <span>VISUAL DESIGNER</span>
                <strong>CBZ.</strong>
              </div>
            </div>
          </TiltedCard>
          <div>
            <h2>科班出身的复合型设计师，长期关注品牌、包装与新视觉工具。</h2>
            <p>
              我对事物保持热情与好奇，也相信审美并非单一存在。电影、展览、音乐、live house 与摄影作品都会成为设计判断的一部分。希望在更长的设计路上，创造出更多可能性。
            </p>
            <div className="contactRows">
              <span><Mail size={17} />374428307@qq.com</span>
              <span><MapPin size={17} />青岛</span>
              <span><Sparkles size={17} />平面设计 / 品牌设计 / AI设计</span>
              <span><GraduationCap size={17} />四川美术学院 · 产品设计本科</span>
            </div>
          </div>
          <aside className="profileAside" aria-label="设计方向与协作信息">
            {profileCards.map(([label, title, desc]) => (
              <div className="profileStaticCard" key={label}>
                <span>{label}</span>
                <strong>{title}</strong>
                <p>{desc}</p>
              </div>
            ))}
          </aside>
        </div>

        <div className="experienceBackdropTitle" aria-hidden="true">
          <span>WORK EXPERIENCE</span>
          <strong>工作经历</strong>
        </div>

        <div className="experienceTimeline">
          <div className="experienceAccordion">
            {timeline.map(({ date, company, role, intro, points }, index) => {
              const isExpanded = expandedExperience === index;
              return (
              <div className={`timelineStackCard experienceAccordionItem ${isExpanded ? 'isExpanded' : ''}`} key={company}>
                  <div className="timelineGlowCard experienceCardSurface">
                    <article>
                      <button
                        className="experienceAccordionTrigger"
                        type="button"
                        aria-expanded={isExpanded}
                        aria-controls={`experience-panel-${index}`}
                        onClick={() => setExpandedExperience(index)}
                      >
                        <span className="experienceAccordionHeading">
                          <time>{date}</time>
                          <span className="experienceCompany">{company}</span>
                          <strong>{role}</strong>
                        </span>
                        <span className="experienceAccordionIcon" aria-hidden="true">{isExpanded ? '−' : '+'}</span>
                      </button>
                      <div
                        className="experienceAccordionContent"
                        id={`experience-panel-${index}`}
                        aria-hidden={!isExpanded}
                      >
                        <div>
                          <p>{intro}</p>
                          <ul>
                            {points.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section projects" id="项目">
        <div className="sectionHead">
          <div>
            <div className="sectionLabel">SELECTED PROJECTS</div>
            <h2>精选项目</h2>
          </div>
          <button className="outlineButton portfolioContactButton contactDialogTrigger" type="button" onClick={() => setIsContactOpen(true)}>获取完整作品集 <ArrowUpRight size={16} /></button>
        </div>
        <div className="projectGrid">
          {projects.map((project) => (
            <BorderGlow
              className="projectGlowCard"
              key={project.id}
              edgeSensitivity={18}
              glowColor="356 82 58"
              backgroundColor="rgba(18, 35, 49, 0.58)"
              borderRadius={22}
              glowRadius={34}
              glowIntensity={1.25}
              coneSpread={30}
              animated={Boolean(project.pages?.length)}
              fillOpacity={0.38}
              colors={['#e3272d', '#f3f1eb', '#2cc9ff']}
            >
              <TiltedCard scaleOnHover={1.04} rotateAmplitude={7}>
                <article
                  className={`projectCard ${project.className} ${project.pages?.length ? 'isClickable isCaseCover' : ''}`}
                  onClick={() => openProject(project)}
                  onKeyDown={(event) => {
                    if (project.pages?.length && (event.key === 'Enter' || event.key === ' ')) {
                      event.preventDefault();
                      openProject(project);
                    }
                  }}
                  role={project.pages?.length ? 'button' : undefined}
                  tabIndex={project.pages?.length ? 0 : undefined}
                  aria-label={project.pages?.length ? `打开${project.title.replace('\n', '')}项目` : undefined}
                >
                  <div className="projectImage">
                    {project.cover && (
                      <img className="projectCoverImage" src={project.cover} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                    )}
                    <span>{project.id}</span>
                    <div className="projectTitle">
                      {project.title.split('\n').map((line, index) => (
                        <React.Fragment key={line}>
                          {index > 0 && <br />}
                          {line}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="projectInfo">
                    <span>{project.type}</span>
                    <p>{project.meta}</p>
                    <ArrowUpRight size={20} />
                  </div>
                </article>
              </TiltedCard>
            </BorderGlow>
          ))}
        </div>
      </section>

      {activeProject && (
        <div
          className="projectModalLayer"
          onClick={closeProject}
          onKeyDown={(event) => {
            if (event.key === 'Escape') closeProject();
          }}
          role="presentation"
        >
          <div
            className="projectModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="projectModalClose" type="button" onClick={closeProject} aria-label="关闭项目">
              ×
            </button>
            <header className="projectModalHeader">
              <span>{activeProject.id} CASE STUDY</span>
              <h2 id="project-modal-title">
                {activeProject.title.split('\n').map((line, index) => (
                  <React.Fragment key={line}>
                    {index > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </h2>
              <p>{activeProject.type}</p>
            </header>
            <div className="projectModalScroll">
              <div className="projectModalImages">
                {activeProject.pages.map((page, index) => (
                  <figure className="projectModalImage" key={page}>
                    <img
                      src={page}
                      alt={`${activeProject.title.replace('\n', '')}作品页 ${index + 1}`}
                      loading={index < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {isContactOpen && (
        <div
          className="contactModalLayer"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsContactOpen(false);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setIsContactOpen(false);
          }}
        >
          <section className="contactModal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
            <button className="contactModalClose" type="button" aria-label="关闭联系弹窗" onClick={() => setIsContactOpen(false)}>×</button>
            <div className="contactModalIntro">
              <span>LET'S WORK TOGETHER</span>
              <h2 id="contact-modal-title">联系我</h2>
              <p>欢迎交流品牌视觉、包装与完整作品集。</p>
            </div>
            <div className="contactModalDetails">
              <a href="mailto:374428307@qq.com"><Mail size={18} /><span>邮箱</span><strong>374428307@qq.com</strong></a>
              <div><Phone size={18} /><span>微信</span><strong>BzBzBzz1</strong></div>
            </div>
            <div className="contactQrGrid">
              <figure><img src={wechatQr} alt="微信二维码" /><figcaption>微信</figcaption></figure>
              <figure><img src={xiaohongshuQr} alt="小红书二维码" /><figcaption>小红书</figcaption></figure>
            </div>
          </section>
        </div>
      )}

      <section className="finalContact" id="联系">
        <div>
          <p className="eyebrow">LET'S CREATE SOMETHING BOLD.</p>
          <h2>让品牌视觉更清晰，也更有力量。</h2>
        </div>
        <BorderGlow
          className="contactGlowCard"
          edgeSensitivity={18}
          glowColor="356 82 58"
          backgroundColor="rgba(18, 35, 49, 0.62)"
          borderRadius={22}
          glowRadius={34}
          glowIntensity={1.2}
          coneSpread={30}
          fillOpacity={0.38}
          colors={['#e3272d', '#f3f1eb', '#2cc9ff']}
        >
          <div className="contactPanel">
            <a href="mailto:374428307@qq.com"><Mail size={20} />374428307@qq.com</a>
            <a href="tel:374428307"><Phone size={20} />联系 / 作品集沟通</a>
            <span><MapPin size={20} />青岛 · 可远程协作</span>
            <button className="solidButton contactDialogTrigger" type="button" onClick={() => setIsContactOpen(true)}>开始沟通 <ArrowUpRight size={17} /></button>
          </div>
        </BorderGlow>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);

// Keep the static first-paint cover until React's loader has rendered.
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.getElementById('boot-cover')?.remove();
  });
});

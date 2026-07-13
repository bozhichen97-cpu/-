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
import packagingCover from './assets/packaging-cover.webp';
import wechatQr from './assets/contact/wechat-qr.webp';
import xiaohongshuQr from './assets/contact/xiaohongshu-qr.webp';
import xhsRedPacket from './assets/xiaohongshu/red-packet.jpg';
import xhsRedPacketVideo from './assets/xiaohongshu/red-packet.mp4';
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

const packagingPages = Object.entries(
  import.meta.glob('./assets/packaging/*.webp', { eager: true, import: 'default' })
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, page]) => page);

const packagingExtraPages = Object.entries(
  import.meta.glob('./assets/packaging-extras/*.webp', { eager: true, import: 'default' })
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, page]) => page);

const gangshangPackagingPages = Object.entries(
  import.meta.glob('./assets/packaging-gangshang/*.webp', { eager: true, import: 'default' })
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, page]) => page);

const loadBrandPdfSeries = (folder) => Object.entries(
  import.meta.glob('./assets/brand-pdf/*/*.webp', { eager: true, import: 'default' })
)
  .filter(([path]) => path.includes(`/brand-pdf/${folder}/`))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, page]) => page);

const bellonaViPages = loadBrandPdfSeries('bellona-vi');
const communityLogoPages = loadBrandPdfSeries('community-logo');
const gangshangKaihuaPages = loadBrandPdfSeries('gangshang-kaihua');
const youbenCommercePages = loadBrandPdfSeries('youben-commerce');

const loadXhsSeries = (pattern) => Object.entries(
  import.meta.glob('./assets/xiaohongshu/*/*.jpg', { eager: true, import: 'default' })
)
  .filter(([path]) => path.includes(`/xiaohongshu/${pattern}/`))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, page]) => page);

const xhsHalftonePages = loadXhsSeries('halftone');
const xhsGridPages = loadXhsSeries('grid');
const xhsFigmaPluginPages = loadXhsSeries('figma-plugin');
const xhsFigmaSplitPages = loadXhsSeries('figma-split');
const xhsTitleDesignPages = loadXhsSeries('title-design');
const xhsSpringColorPages = loadXhsSeries('spring-color');
const xhsPortfolioCoverPages = loadXhsSeries('portfolio-cover');
const xhsKpopColorPages = loadXhsSeries('kpop-color');
const xhsFontSharePages = loadXhsSeries('font-share');
const xhsChristmasColorPages = loadXhsSeries('christmas-color');
const xhsVisualAccountsPages = loadXhsSeries('visual-accounts');
const xhsJellycatPages = loadXhsSeries('jellycat');
const xhsWebsitesPages = loadXhsSeries('websites');
const xhsDailyInspirationPages = loadXhsSeries('daily-inspiration');
const xhsEmptySpacePages = loadXhsSeries('empty-space');
const xhsFigmaButtonPages = loadXhsSeries('figma-button');
const xhsBrandPages = loadXhsSeries('brand');
const xhsPosterPages = loadXhsSeries('poster');
const xhsFigmaCardPages = loadXhsSeries('figma-card');

const navItems = ['经历', '项目', '联系'];
const pillNavItems = navItems.map((item) => ({ label: item, href: `#${item}` }));

const projects = [
  {
    id: '01',
    title: '品牌视觉\n与系统设计',
    type: '品牌识别 / VI 系统 / 商业延展',
    meta: 'Bellona 与乾杯醺茶两组完整品牌案例',
    className: 'project-brand',
    cover: bellonaCoverClean,
    pages: [...bellonaPages, ...ganbeiPages],
    brandCase: {
      summary: '通过品牌定位、核心识别与多场景延展，把不同品类的品牌概念转化为统一、清晰且可落地的视觉系统。',
      role: '品牌概念 · 视觉识别 · 包装与物料延展',
      stats: [
        ['5', '组品牌与规范案例'],
        ['60+', '张精选系统展示'],
        ['5', '类品牌应用场景']
      ],
      projects: [
        {
          index: '01',
          title: 'Bellona 品牌视觉升级',
          type: 'MEDICAL AESTHETICS',
          description: '先呈现升级前的原有 VI 规范，再展示围绕医美品牌专业感与品质感完成的视觉升级、包装系统与商业物料延展。',
          pages: [...bellonaViPages, ...bellonaPages]
        },
        {
          index: '02',
          title: '乾杯醺茶品牌视觉',
          type: 'TEA & ORIENTAL CULTURE',
          description: '从国风文化与茶饮场景出发，完成品牌标识、视觉符号、包装及线下应用的系统延展。',
          pages: ganbeiPages
        },
        {
          index: '03',
          title: '尢本电商视觉规范',
          type: 'E-COMMERCE VISUAL SYSTEM',
          description: '围绕健康产品建立从品牌理念、详情页逻辑到主图、KV、主题活动和产品场景图的电商视觉规范。',
          pages: youbenCommercePages
        },
        {
          index: '04',
          title: '习水兰苑社区品牌标识',
          type: 'COMMUNITY IDENTITY',
          description: '融合党旗、和平鸽、水波纹与居民家园等符号，形成兼顾党建引领、社区包容与宜居感的标识及应用系统。',
          pages: communityLogoPages
        },
        {
          index: '05',
          title: '杠上开花品牌视觉提案',
          type: 'YOUTH & NEW MEDIA BRANDING',
          description: '以麻将文化、年轻社交和新媒体语境为核心，通过高识别配色、字体组合与图形节奏塑造活泼的品牌表达。',
          pages: gangshangKaihuaPages
        }
      ]
    }
  },
  {
    id: '02',
    title: '品牌宣传\n与视觉物料',
    type: '品牌宣传 / 活动物料 / UI',
    meta: '集团内外宣与产品界面支持',
    className: 'project-corp'
  },
  {
    id: '03',
    title: '包装设计',
    type: '包装系统 / 礼盒',
    meta: '医美包装与礼盒包装延展',
    className: 'project-packaging',
    cover: packagingCover,
    pages: packagingPages,
    packagingCase: {
      summary: '从品牌概念、包装视觉到效果呈现，围绕医美、节礼与酒类产品完成多类型包装设计，兼顾识别度、信息层级与商业陈列效果。',
      role: '视觉概念 · 包装版式 · 系列延展 · 效果呈现',
      stats: [
        ['4', '组包装项目'],
        ['30', '张设计展示'],
        ['4', '类产品场景']
      ],
      projects: [
        {
          index: '01',
          title: 'UNINO 医美套盒',
          type: 'MEDICAL AESTHETICS',
          description: '以克制的蓝白配色、压凹工艺与几何比例构建专业医美产品形象，并延展至内外盒结构及应用场景。',
          pages: packagingPages.slice(0, 5)
        },
        {
          index: '02',
          title: '中秋礼盒设计',
          type: 'FESTIVAL GIFT BOX',
          description: '从书法字形、传统印章与山水意象出发，建立东方节礼视觉语言，并完成包装展开与礼赠物料延展。',
          pages: packagingPages.slice(5, 12)
        },
        {
          index: '03',
          title: '酒类包装视觉',
          type: 'LIQUOR PACKAGING',
          description: '提取地域建筑与文化符号，形成瓶标、插画、配色及外盒版式的统一系统。',
          pages: packagingPages.slice(12, 16)
        },
        {
          index: '04',
          title: '商业包装精选',
          type: 'SELECTED COMMERCIAL WORK',
          description: '收录节日礼盒与医美产品两类短项目，以更紧凑的方式展示不同品类下的视觉适配和成品表现。',
          pages: [...gangshangPackagingPages, ...packagingPages.slice(16, 19), ...packagingExtraPages],
          groups: [
            {
              title: '杠上开花 · 2023 节礼与周边',
              label: '2023 SEASONAL EXTENSIONS',
              pages: [
                ...gangshangPackagingPages.slice(0, 4),
                ...gangshangPackagingPages.slice(5, 7)
              ]
            },
            {
              title: '杠上开花 · 2024 龙年大礼包',
              label: '2024 DRAGON YEAR GIFT BOX',
              pages: [gangshangPackagingPages[4], ...packagingPages.slice(16, 19)]
            },
            {
              title: '医美产品包装延展',
              label: 'MEDICAL PRODUCT PACKAGING',
              pages: packagingExtraPages
            }
          ]
        }
      ]
    }
  },
  {
    id: '04',
    title: '小红书\n内容设计',
    type: '选题策划 / 封面设计 / 多图内容',
    meta: '从选题到整套视觉，构建设计知识型社媒内容',
    className: 'project-social',
    cover: xhsGridPages[xhsGridPages.length - 1],
    pages: [...xhsGridPages, ...xhsHalftonePages],
    socialCase: {
      period: '2024.10.10 — 至今',
      role: '内容选题策划 · 封面设计 · 多图内容制作',
      summary: '从选题判断、信息拆解到整套图片制作，持续输出设计教程、排版方法与审美灵感，建立兼顾点击识别、阅读节奏和收藏价值的内容体系。',
      stats: [
        ['28', '组内容选题'],
        ['130+', '张视觉内容'],
        ['1.4万', '账号累计获赞与收藏']
      ],
      highlights: [
        {
          index: '01',
          kicker: 'TOP-PERFORMING CONTENT',
          title: '排版那些事儿｜网格系统',
          metric: '1296 点赞 · 1080 收藏',
          description: '把抽象的网格知识拆解成 7 张连续图文，通过统一橙色视觉、明确层级和步骤化结构提升理解与收藏价值；收藏量接近点赞量，体现了教程内容的长期实用性。',
          pages: xhsGridPages
        },
        {
          index: '02',
          kicker: 'HIGH-ENGAGEMENT CONTENT',
          title: '彩色半调｜视觉教程',
          metric: '公开点赞约 910',
          description: '以彩色半调这一流行视觉效果切入，用生活化主题降低教程距离感；从封面吸引到步骤展示形成完整阅读路径。',
          pages: xhsHalftonePages
        },
        {
          index: '03',
          kicker: 'TOOL-BASED CONTENT',
          title: 'Figma 插件｜工具型内容',
          metric: '公开点赞约 151',
          description: '从设计师的真实效率需求出发策划选题，用高信息密度封面明确内容价值，再以 9 张图完成工具筛选与介绍。',
          pages: xhsFigmaPluginPages
        },
        {
          index: '04',
          kicker: 'COLOR & INSPIRATION',
          title: '春日调色盘｜系列栏目',
          metric: '9 张配色内容',
          description: '围绕季节情绪策划配色主题，用色值、色块与应用画面组成可直接收藏和复用的灵感内容。',
          pages: xhsSpringColorPages
        }
      ],
      collections: [
        {
          title: '排版与字体',
          description: '把专业排版方法转化为可快速理解和练习的移动端内容。',
          items: [
            { title: '标题设计感', cover: xhsTitleDesignPages[0] },
            { title: '免费商用字体', cover: xhsFontSharePages[0] },
            { title: '作品集封面参考', cover: xhsPortfolioCoverPages[0] },
            { title: '画面太空怎么办', cover: xhsEmptySpacePages[0] }
          ]
        },
        {
          title: '设计工具与制作技巧',
          description: '以明确结果为入口，用步骤化内容降低软件学习门槛。',
          items: [
            { title: 'Figma 分型效果', cover: xhsFigmaSplitPages[0] },
            { title: 'Figma 通透感按钮', cover: xhsFigmaButtonPages[0] },
            { title: '动态轻透质感卡片', cover: xhsFigmaCardPages[0] },
            { title: '照片变氛围感海报', cover: xhsPosterPages[0] }
          ]
        },
        {
          title: '配色与审美灵感',
          description: '通过主题化收集、筛选与再编排，建立稳定更新的灵感栏目。',
          items: [
            { title: '饭圈配色', cover: xhsKpopColorPages[0] },
            { title: '圣诞节配色', cover: xhsChristmasColorPages[0] },
            { title: '视觉公众号参考', cover: xhsVisualAccountsPages[0] },
            { title: '日常素材收集', cover: xhsDailyInspirationPages[0] },
            { title: '设计灵感网站', cover: xhsWebsitesPages[0] },
            { title: 'Jellycat 创意内容', cover: xhsJellycatPages[0] },
            { title: '品牌新五感', cover: xhsBrandPages[0] }
          ]
        }
      ]
    }
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
    }, 2500);
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
    if (!criticalAssetsReady && !loadSafetyReleased) return undefined;
    if (loadFinishStartedAtRef.current === null) {
      loadFinishFromRef.current = loadProgressRef.current;
      loadFinishStartedAtRef.current = performance.now();
    }
    return undefined;
  }, [criticalAssetsReady, loadSafetyReleased]);

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

      const isTouchLayout = window.matchMedia('(pointer: coarse), (max-width: 768px)').matches;
      if (!isTouchLayout) {
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
        const images = section.querySelectorAll('.portraitCard');

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
      }
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
          <div className="profileIntro">
            <span className="profileIntroLabel">CORE PROFILE</span>
            <h2>科班出身的 <em>复合型设计师</em><span>长期关注品牌、包装与新视觉工具。</span></h2>
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
            className={`projectModal ${activeProject.socialCase ? 'isSocialCase' : ''} ${activeProject.packagingCase ? 'isPackagingCase' : ''} ${activeProject.brandCase ? 'isBrandCase' : ''}`}
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
              {activeProject.socialCase ? (
                <div className="xhsCase">
                  <section className="xhsCaseIntro">
                    <div className="xhsCaseIntroCopy">
                      <span>PROJECT OVERVIEW</span>
                      <p>{activeProject.socialCase.summary}</p>
                    </div>
                    <dl className="xhsCaseMeta">
                      <div><dt>参与时间</dt><dd>{activeProject.socialCase.period}</dd></div>
                      <div><dt>负责内容</dt><dd>{activeProject.socialCase.role}</dd></div>
                    </dl>
                    <div className="xhsCaseStats">
                      {activeProject.socialCase.stats.map(([value, label]) => (
                        <div key={label}><strong>{value}</strong><span>{label}</span></div>
                      ))}
                    </div>
                    <small className="xhsCaseDisclosure">内容数量依据本次整理素材；账号累计数据与代表笔记数据均来自小红书公开页面。</small>
                  </section>

                  <section className="xhsCaseStrategy">
                    <div><span>01</span><strong>教程与工具</strong><p>围绕 Figma、Illustrator 和实用设计效果，提供能被直接学习的步骤内容。</p></div>
                    <div><span>02</span><strong>排版与字体</strong><p>拆解网格、标题、版式和字体应用，把专业知识转化为清晰图文。</p></div>
                    <div><span>03</span><strong>配色与灵感</strong><p>以主题化收集和视觉再编排，持续输出可收藏、可复用的审美参考。</p></div>
                  </section>

                  <section className="xhsHighlights">
                    <div className="xhsSectionHeading">
                      <span>SELECTED CONTENT</span>
                      <h3>高互动内容与完整系列</h3>
                    </div>
                    {activeProject.socialCase.highlights.map((highlight) => (
                      <article className="xhsHighlight" key={highlight.index}>
                        <header>
                          <span>{highlight.index} / {highlight.kicker}</span>
                          <h4>{highlight.title}</h4>
                          <strong>{highlight.metric}</strong>
                          <p>{highlight.description}</p>
                        </header>
                        <div className={`xhsImageGrid ${highlight.pages.length === 1 ? 'isSingle' : ''}`}>
                          {highlight.pages.map((page, index) => (
                            <figure key={page}>
                              <img src={page} alt={`${highlight.title} 第 ${index + 1} 张`} loading="lazy" decoding="async" />
                            </figure>
                          ))}
                        </div>
                      </article>
                    ))}
                  </section>

                  <section className="xhsCollections">
                    <div className="xhsSectionHeading">
                      <span>CONTENT SYSTEM</span>
                      <h3>内容栏目与视觉覆盖</h3>
                    </div>
                    {activeProject.socialCase.collections.map((collection) => (
                      <article className="xhsCollectionGroup" key={collection.title}>
                        <header>
                          <h4>{collection.title}</h4>
                          <p>{collection.description}</p>
                        </header>
                        <div className="xhsCollectionGrid">
                          {collection.items.map((item) => (
                            <figure key={item.title}>
                              <img src={item.cover} alt={item.title} loading="lazy" decoding="async" />
                              <figcaption>{item.title}</figcaption>
                            </figure>
                          ))}
                        </div>
                      </article>
                    ))}
                  </section>

                  <section className="xhsVideoCase">
                    <div>
                      <span>MOTION CONTENT</span>
                      <h3>原创蛇年红包</h3>
                      <p>将节日节点、像素视觉和互动概念结合为动态内容，扩展账号的内容形式。</p>
                      <a href="https://www.xiaohongshu.com/user/profile/634adf7f000000001901db67" target="_blank" rel="noreferrer">查看小红书主页 <ArrowUpRight size={16} /></a>
                    </div>
                    <video controls playsInline preload="metadata" poster={xhsRedPacket}>
                      <source src={xhsRedPacketVideo} type="video/mp4" />
                    </video>
                  </section>
                </div>
              ) : activeProject.brandCase ? (
                <div className="brandCase">
                  <section className="xhsCaseIntro brandCaseIntro">
                    <div className="xhsCaseIntroCopy">
                      <span>PROJECT OVERVIEW</span>
                      <p>{activeProject.brandCase.summary}</p>
                    </div>
                    <dl className="xhsCaseMeta">
                      <div><dt>项目类型</dt><dd>医美品牌 · 国风茶饮</dd></div>
                      <div><dt>负责内容</dt><dd>{activeProject.brandCase.role}</dd></div>
                    </dl>
                    <div className="xhsCaseStats">
                      {activeProject.brandCase.stats.map(([value, label]) => (
                        <div key={label}><strong>{value}</strong><span>{label}</span></div>
                      ))}
                    </div>
                  </section>

                  <section className="xhsCaseStrategy brandCaseStrategy">
                    <div><span>01</span><strong>品牌定位转译</strong><p>从行业属性、受众与场景出发，把抽象的品牌方向转化为可被感知的视觉气质。</p></div>
                    <div><span>02</span><strong>识别系统建立</strong><p>通过标识、字体、色彩与图形语言形成稳定的品牌识别，并保持系列一致性。</p></div>
                    <div><span>03</span><strong>商业场景延展</strong><p>把核心视觉应用到包装、宣传物料与空间触点，验证系统在真实场景中的适应性。</p></div>
                  </section>

                  <section className="packagingProjects brandProjects">
                    <div className="xhsSectionHeading">
                      <span>SELECTED BRAND SYSTEMS</span>
                      <h3>品牌案例与视觉延展</h3>
                    </div>
                    {activeProject.brandCase.projects.map((item) => (
                      <article className="packagingProject brandProject" key={item.index}>
                        <header>
                          <span>{item.index} / {item.type}</span>
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                        </header>
                        <div className="packagingProjectGrid brandProjectGrid">
                          {item.pages.map((page, index) => (
                            <figure key={page}>
                              <img src={page} alt={`${item.title}作品图 ${index + 1}`} loading="lazy" decoding="async" />
                            </figure>
                          ))}
                        </div>
                      </article>
                    ))}
                  </section>
                </div>
              ) : activeProject.packagingCase ? (
                <div className="packagingCase">
                  <section className="xhsCaseIntro packagingCaseIntro">
                    <div className="xhsCaseIntroCopy">
                      <span>PROJECT OVERVIEW</span>
                      <p>{activeProject.packagingCase.summary}</p>
                    </div>
                    <dl className="xhsCaseMeta packagingCaseMeta">
                      <div><dt>项目类型</dt><dd>医美包装 · 节日礼盒 · 酒类包装</dd></div>
                      <div><dt>负责内容</dt><dd>{activeProject.packagingCase.role}</dd></div>
                    </dl>
                    <div className="xhsCaseStats">
                      {activeProject.packagingCase.stats.map(([value, label]) => (
                        <div key={label}><strong>{value}</strong><span>{label}</span></div>
                      ))}
                    </div>
                  </section>

                  <section className="xhsCaseStrategy packagingCaseStrategy">
                    <div><span>01</span><strong>品牌语言提炼</strong><p>从产品定位与使用场景出发，确定包装的核心气质、识别符号与色彩系统。</p></div>
                    <div><span>02</span><strong>包装系统延展</strong><p>把视觉概念落实到盒型、瓶标、内外包装及系列版本，保持信息层级统一。</p></div>
                    <div><span>03</span><strong>商业效果呈现</strong><p>通过效果图、材质与陈列场景展示设计落地后的真实质感与货架表现。</p></div>
                  </section>

                  <section className="packagingProjects">
                    <div className="xhsSectionHeading">
                      <span>SELECTED PACKAGING</span>
                      <h3>包装项目与系列延展</h3>
                    </div>
                    {activeProject.packagingCase.projects.map((item) => (
                      <article className="packagingProject" key={item.index}>
                        <header>
                          <span>{item.index} / {item.type}</span>
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                        </header>
                        {item.groups ? (
                          <div className="packagingSubgroups">
                            {item.groups.map((group) => (
                              <section className="packagingSubgroup" key={group.title}>
                                <header><span>{group.label}</span><h5>{group.title}</h5></header>
                                <div className="packagingProjectGrid">
                                  {group.pages.map((page, index) => (
                                    <figure key={page}>
                                      <img src={page} alt={`${group.title}作品图 ${index + 1}`} loading="lazy" decoding="async" />
                                    </figure>
                                  ))}
                                </div>
                              </section>
                            ))}
                          </div>
                        ) : (
                          <div className={`packagingProjectGrid ${item.pages.length === 1 ? 'isSingle' : ''}`}>
                            {item.pages.map((page, index) => (
                              <figure key={page}>
                                <img src={page} alt={`${item.title}作品图 ${index + 1}`} loading="lazy" decoding="async" />
                              </figure>
                            ))}
                          </div>
                        )}
                      </article>
                    ))}
                  </section>
                </div>
              ) : (
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
              )}
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

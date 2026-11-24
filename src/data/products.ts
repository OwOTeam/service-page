// 产品内容的单一数据源：首页卡片、详情页、法律页、时间线均由此生成。
// 措辞约束：只写已确认的事实；授权以各仓库实际文件为准，未确认的不做声明。

export type Locale = 'zh' | 'en'
export type L = Record<Locale, string>
export type Tone = 'stable' | 'beta' | 'early' | 'live'
export type Openness = 'open' | 'partial' | 'closed'

export interface Feature {
  title: L
  desc: L
}

export interface Product {
  id: 'identity' | 'travelai' | 'recorder' | 'deployer' | 'flight'
  name: string
  short: string
  /** 源码是否公开：由作者确认 */
  openness: Openness
  accent: string
  logo?: string
  tagline: L
  summary: L
  /** 未公开版本号的产品留空，不编造 */
  version?: string
  released?: string
  status: { label: L; tone: Tone }
  platform: L
  scenario: L
  stats: { value: string; label: L }[]
  features: Feature[]
  stack: string[]
  quickstart?: { title: L; lang: string; code: string }
  gallery: { src: string; alt: L; phone?: boolean }[]
  notes: L[]
  license: L
  links: { label: L; href: string; primary?: boolean }[]
}

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`

export const products: Product[] = [
  {
    id: 'identity',
    name: 'OwO! Identity',
    short: 'Identity',
    openness: 'closed',
    accent: '#1687e8',
    logo: asset('img/identity/logo.svg'),
    tagline: {
      zh: '自托管的多租户企业身份提供商',
      en: 'A self-hosted, multi-tenant enterprise identity provider',
    },
    summary: {
      zh: '基于 OIDC / OAuth 2.0 与 SAML 2.0 的单点登录，自带用户门户与管理控制台，带审计与可观测能力。',
      en: 'Single sign-on over OIDC / OAuth 2.0 and SAML 2.0, with a user portal, admin consoles, auditing and observability built in.',
    },
    version: 'v1.4.0',
    released: '2026-09-25',
    status: {
      label: { zh: '生产可用 · 含已记录例外', en: 'Production-ready · documented exceptions' },
      tone: 'stable',
    },
    platform: { zh: 'Linux 自托管 · Go + PostgreSQL + Redis', en: 'Self-hosted · Go + PostgreSQL + Redis' },
    scenario: { zh: '我想做统一登录', en: 'Unified sign-in' },
    stats: [
      { value: 'OIDC + SAML', label: { zh: '协议', en: 'Protocols' } },
      { value: 'Passkey', label: { zh: 'TOTP / WebAuthn', en: 'TOTP / WebAuthn' } },
      { value: 'SCIM 2.0', label: { zh: '目录同步', en: 'Provisioning' } },
    ],
    features: [
      {
        title: { zh: '每租户独立 Issuer', en: 'Per-tenant issuers' },
        desc: {
          zh: '每个租户拥有独立的 issuer：{external_url}/tenants/{slug}，隔离配置、密钥与策略。',
          en: 'Every tenant gets its own issuer at {external_url}/tenants/{slug}, isolating config, keys and policy.',
        },
      },
      {
        title: { zh: '完整的 OIDC / OAuth 2.0', en: 'Broad OIDC / OAuth 2.0' },
        desc: {
          zh: '授权码 + PKCE、刷新、客户端凭证、Device Code、CIBA、PAR、JAR，以及 Discovery、JWKS、UserInfo、Introspect、Revoke。',
          en: 'Authorization Code + PKCE, refresh, client credentials, Device Code, CIBA, PAR and JAR, plus discovery, JWKS, UserInfo, introspection and revocation.',
        },
      },
      {
        title: { zh: 'SAML 2.0 IdP', en: 'SAML 2.0 IdP' },
        desc: {
          zh: 'IdP 元数据、SP 发起的 SSO、签名响应、单点登出与 SP 证书轮换。',
          en: 'IdP metadata, SP-initiated SSO, signed responses, single logout and SP certificate rotation.',
        },
      },
      {
        title: { zh: '多因素与 Passkey', en: 'MFA and passkeys' },
        desc: {
          zh: 'TOTP、备用码与 WebAuthn / Passkey；密码使用 Argon2id 存储。',
          en: 'TOTP, backup codes and WebAuthn / passkeys; passwords are stored with Argon2id.',
        },
      },
      {
        title: { zh: '联合身份与目录', en: 'Federation and directory' },
        desc: {
          zh: 'Google、GitHub、Microsoft、Apple、通用 OIDC、LDAP / AD，SCIM 2.0 用户与组，邀请、自定义角色与访问评审。',
          en: 'Google, GitHub, Microsoft, Apple, generic OIDC and LDAP / AD; SCIM 2.0 users and groups; invitations, custom roles and access reviews.',
        },
      },
      {
        title: { zh: '审计与合规', en: 'Audit and compliance' },
        desc: {
          zh: '审计日志可导出 SIEM（ndjson / CEF）并支持 HTTP 推送，冷归档到文件系统或 S3。',
          en: 'Audit logs export to SIEM (ndjson / CEF) with optional HTTP push, and archive to the filesystem or S3.',
        },
      },
      {
        title: { zh: '浏览器不持有令牌', en: 'No tokens in the browser' },
        desc: {
          zh: '前端通过 Express BFF 访问后端，访问令牌与刷新令牌不会进入浏览器。',
          en: 'The frontend talks to the backend through an Express BFF, so access and refresh tokens never reach the browser.',
        },
      },
      {
        title: { zh: '运维与 SDK', en: 'Operations and SDKs' },
        desc: {
          zh: '/health、/ready、/metrics、密钥轮换与备份演练；提供 Go、TypeScript、Dart / Flutter SDK。',
          en: '/health, /ready, /metrics, key rotation and backup drills; SDKs for Go, TypeScript and Dart / Flutter.',
        },
      },
    ],
    stack: ['Go', 'Gin', 'PostgreSQL 16', 'Redis 7', 'React 19', 'TypeScript', 'Ant Design', 'Tailwind CSS'],
    quickstart: {
      title: { zh: '接入：读取 OIDC Discovery', en: 'Integrate: read OIDC discovery' },
      lang: 'bash',
      code: `# 每个租户都有自己的 issuer
curl https://sso.owoserver.com/tenants/<slug>/.well-known/openid-configuration`,
    },
    gallery: [],
    notes: [
      {
        zh: 'OwO! TravelAI 与 OwO! Recorder 的账号登录都基于它（OIDC）。',
        en: 'Sign-in for OwO! TravelAI and OwO! Recorder is built on it (OIDC).',
      },
      {
        zh: '定位为“自托管企业 IdP，生产可用，含文档中记录的例外”。不宣称替代其他 IdP，也不宣称多活写复制。',
        en: 'Positioned as a self-hosted enterprise IdP, production-ready with documented exceptions. It makes no claim to replace other IdPs and no claim of multi-active write replication.',
      },
      {
        zh: '多区域目前为只读镜像（sticky issuer）。',
        en: 'Multi-region is currently a read-only mirror with a sticky issuer.',
      },
    ],
    license: {
      zh: '闭源项目，源码不公开。',
      en: 'Closed-source: the source code is not public.',
    },
    links: [
      { label: { zh: '访问服务', en: 'Open the service' }, href: 'https://sso.owoserver.com', primary: true },
      { label: { zh: '作者博客', en: 'Author blog' }, href: 'https://hanskijay.dev' },
    ],
  },
  {
    id: 'travelai',
    name: 'OwO! TravelAI',
    short: 'TravelAI',
    openness: 'closed',
    accent: '#6366f1',
    logo: asset('img/travelai/owl.svg'),
    tagline: {
      zh: '离线优先的智能旅行助手',
      en: 'An offline-first intelligent travel assistant',
    },
    summary: {
      zh: '离线矢量地图、端侧 AI 助手与多语言语音翻译。出发前下载签名资源包，飞行模式下也能用。',
      en: 'Offline vector maps, an on-device AI assistant and multilingual voice translation. Download signed packs before you leave and keep working in airplane mode.',
    },
    version: 'v0.1.0',
    released: '2026-11-24',
    status: {
      label: { zh: '早期版本 · 直装 APK', en: 'Early release · direct APK' },
      tone: 'early',
    },
    platform: { zh: 'Android 8.0+（arm64）', en: 'Android 8.0+ (arm64)' },
    scenario: { zh: '我要出国旅行', en: 'Travelling abroad' },
    stats: [
      { value: '14', label: { zh: '助手语言', en: 'Assistant languages' } },
      { value: '15', label: { zh: 'POI 类别', en: 'POI categories' } },
      { value: '0', label: { zh: '客户端遥测', en: 'Client telemetry' } },
    ],
    features: [
      {
        title: { zh: '离线地图与 POI', en: 'Offline maps and POIs' },
        desc: {
          zh: '离线矢量地图，15 类 POI 即时就近搜索，覆盖厕所、饮水、AED、ATM、药店等，并含离线营业时间与 GTFS 公共交通时刻表。',
          en: 'Offline vector maps with instant nearest search over 15 POI categories, including toilets, water, AEDs, ATMs and pharmacies, plus offline opening hours and GTFS transit timetables.',
        },
      },
      {
        title: { zh: '端侧 AI 助手', en: 'On-device AI assistant' },
        desc: {
          zh: '本地运行的大模型配合确定性工具调用；专业模式下回答附带 source_id 引用；支持路线规划。',
          en: 'A locally running LLM with a deterministic tool harness; professional mode answers carry source_id citations; route planning included.',
        },
      },
      {
        title: { zh: '多语言语音翻译', en: 'Multilingual voice translation' },
        desc: {
          zh: '面对面分屏模式（上半屏旋转 180°）、免手持同声传译循环（VAD → ASR → 语种识别 → 翻译 → TTS）并带回译校验。',
          en: 'Face-to-face split screen (top half rotated 180°) and a hands-free interpreter loop (VAD → ASR → LID → MT → TTS) with back-translation checks.',
        },
      },
      {
        title: { zh: '相机菜单 / 路牌翻译', en: 'Camera menu and sign translation' },
        desc: {
          zh: '端侧 OCR 识别后即时翻译，另有常用短语与过敏信息展示卡。',
          en: 'On-device OCR with instant translation, plus a phrasebook and allergy show cards.',
        },
      },
      {
        title: { zh: '签名离线包', en: 'Signed offline packs' },
        desc: {
          zh: '地图、POI、翻译、语音与模型以 Ed25519 签名的资源包分发，支持 HTTP 206 断点续传。',
          en: 'Maps, POIs, translation, speech and models ship as Ed25519-signed packs delivered with HTTP 206 range requests.',
        },
      },
      {
        title: { zh: '隐私优先', en: 'Privacy first' },
        desc: {
          zh: '客户端零遥测、本地数据加密、一键“忘记我”。联网检索需明确同意，且不会发送 GPS 或个人资料。',
          en: 'Zero client telemetry, encrypted local data and a one-tap “Forget Me”. Web lookups need explicit consent and never send GPS or profile data.',
        },
      },
      {
        title: { zh: '旅行小工具', en: 'Travel companions' },
        desc: {
          zh: '离线汇率换算与记账、可导出 GPX 的行程规划、紧急卡片、省电旅行模式与 Owl Passport 打卡。',
          en: 'Offline currency converter and expense ledger, itinerary planning with GPX export, an emergency card, a power-saving travel mode and Owl Passport check-ins.',
        },
      },
    ],
    stack: ['Flutter', 'Dart', 'SQLite', 'PMTiles', 'LiteRT-LM', 'sherpa-onnx', 'Go', 'PostGIS', 'React'],
    gallery: [
      { src: asset('img/travelai/world.png'), alt: { zh: '世界与离线包', en: 'World and offline packs' }, phone: true },
      { src: asset('img/travelai/explore.png'), alt: { zh: '地图探索', en: 'Map exploration' }, phone: true },
      { src: asset('img/travelai/assistant.png'), alt: { zh: 'AI 助手', en: 'AI assistant' }, phone: true },
      { src: asset('img/travelai/translation.png'), alt: { zh: '语音翻译', en: 'Voice translation' }, phone: true },
      { src: asset('img/travelai/packs.png'), alt: { zh: '资源包管理', en: 'Pack management' }, phone: true },
    ],
    notes: [
      {
        zh: '当前通过直装 APK 分发，Google Play 上架尚未完成。',
        en: 'Currently distributed as a direct APK; the Google Play listing is not live yet.',
      },
      {
        zh: '在线增强目前仅覆盖欧洲（z0–12 瓦片），不承诺全球在线覆盖。',
        en: 'Online enhancement currently covers Europe only (z0–12 tiles); no global online coverage is promised.',
      },
      {
        zh: '账号登录使用 OwO! Identity 的 OIDC，并支持 TOTP 与 Passkey 二次验证。',
        en: 'Sign-in uses OwO! Identity over OIDC, with TOTP and passkey step-up.',
      },
    ],
    license: {
      zh: '闭源项目，源码不公开。第三方数据与模型各自遵循其许可（如 OSM ODbL、Wikipedia CC BY-SA）。',
      en: 'Closed-source: the source code is not public. Third-party data and models follow their own licences (for example OSM ODbL and Wikipedia CC BY-SA).',
    },
    links: [
      { label: { zh: '产品官网', en: 'Product site' }, href: 'https://travelai.owoserver.com/', primary: true },
    ],
  },
  {
    id: 'recorder',
    name: 'OwO! Recorder',
    short: 'Recorder',
    openness: 'closed',
    accent: '#2458db',
    logo: asset('img/recorder/logo.svg'),
    tagline: {
      zh: '本地优先的课堂录音与学习助手',
      en: 'A local-first lecture recorder and study assistant',
    },
    summary: {
      zh: '课堂录音、实时转写、中文翻译与学习资料整理。识别、翻译、分析和总结都在你自己的设备上完成，服务器只负责云端同步、数据存储和日常运维。',
      en: 'Lecture recording, live transcription, Chinese translation and study-material generation. Recognition, translation, analysis and summaries all run on your own device, while the server only handles sync, storage and operations.',
    },
    version: 'v0.5',
    released: '2026-10-08',
    status: {
      label: { zh: '在线服务 · 登录使用', en: 'Hosted service · sign-in required' },
      tone: 'live',
    },
    platform: {
      zh: '网页 + 本机算力客户端（Windows 10/11 · Linux · macOS）',
      en: 'Web + on-device compute client (Windows 10/11 · Linux · macOS)',
    },
    scenario: { zh: '我要上课录音', en: 'Recording lectures' },
    stats: [
      { value: '21', label: { zh: '课堂语言', en: 'Lecture languages' } },
      { value: '3', label: { zh: '客户端平台', en: 'Client platforms' } },
      { value: '0', label: { zh: '第三方上传', en: 'Third-party uploads' } },
    ],
    features: [
      {
        title: { zh: '实时转写与翻译', en: 'Live transcription and translation' },
        desc: {
          zh: '支持从 21 种课堂语言中选择，其他语言翻译为简体中文，中文课堂则仅转写与分析。可采集麦克风，或在 Chrome / Edge 的共享选择器中采集已授权的系统声音，实时显示原文、译文与课堂要点。',
          en: 'Choose from 21 lecture languages; other languages are translated into Simplified Chinese, while Chinese lectures are only transcribed and analysed. Capture the microphone or, in Chrome / Edge, authorised system audio, with the original, translation and key points shown live.',
        },
      },
      {
        title: { zh: '在你自己的设备上处理', en: 'Processed on your own device' },
        desc: {
          zh: '识别、翻译、分析和总结由你自己的算力客户端完成，使用本地的开源模型。客户端提供命令行和可视化两种，覆盖 Windows 10/11、Linux 与 macOS（含 Apple 芯片）；网关本身不加载课堂模型。',
          en: 'Recognition, translation, analysis and summaries run on your own compute client using local open models. The client comes as a command-line and a visual program for Windows 10/11, Linux and macOS (including Apple silicon); the gateway itself loads no classroom models.',
        },
      },
      {
        title: { zh: '课后学习资料', en: 'Study material after class' },
        desc: {
          zh: '课后生成最终总结、关键要点、术语表和复习问题，并以不可变版本保存：可固定默认版本、比较任意两个版本，并导出 Markdown。同时支持本地录音回放。',
          en: 'After class you get a final summary, key points, a glossary and review questions, saved as immutable versions you can pin, compare and export as Markdown, alongside local audio playback.',
        },
      },
      {
        title: { zh: '重新处理与长课堂', en: 'Reprocessing and long lectures' },
        desc: {
          zh: '可重新转写、重新翻译、重新分析或完整重处理，成功后原子切换到新版本，空结果不会覆盖已有资料。超出模型输入上限的长课堂会按音频对齐分段分别分析。',
          en: 'Re-transcribe, re-translate, re-analyse or reprocess everything; a successful run switches to the new version atomically, and an empty result never overwrites existing material. Lectures beyond the model input limit are split into audio-aligned passages and analysed separately.',
        },
      },
      {
        title: { zh: '音频导入', en: 'Audio import' },
        desc: {
          zh: '可导入 WAV、MP3、M4A、FLAC。后端会验证真实容器与编码，再流式转换为 16 kHz 单声道 WAV 处理；长音频支持分片续传。',
          en: 'Import WAV, MP3, M4A and FLAC. The backend validates the real container and codec, then streams it into 16 kHz mono WAV for processing; long files upload in resumable parts.',
        },
      },
      {
        title: { zh: '可靠的实时采集', en: 'Reliable live capture' },
        desc: {
          zh: '16 kHz 单声道分片带确认回执，断线后重发并按 chunk_id 去重，不会静默丢失已采集的音频。刷新页面后可发现未结束的课堂，并由你决定是否恢复。',
          en: '16 kHz mono chunks carry acknowledgements and are resent after a drop with chunk_id de-duplication, so captured audio is not silently lost. After a refresh you can find an unfinished lecture and choose whether to resume it.',
        },
      },
      {
        title: { zh: '录音库与分享', en: 'Library and sharing' },
        desc: {
          zh: '按分区和标签整理录音，支持检索与导入历史课堂，并可生成分享链接。',
          en: 'Organise recordings by section and tag, search past lectures, and create share links.',
        },
      },
      {
        title: { zh: '存储与计费', en: 'Storage and billing' },
        desc: {
          zh: '每个账号有 1 GB 基础存储额度，可通过存储套餐扩容，付款经 OwO! Identity 的 Stripe 结账完成。费用只针对云端存储容量，不按使用 AI 模型计费。',
          en: 'Every account gets a 1 GB base quota that storage plans can extend, paid through OwO! Identity’s Stripe checkout. Fees cover cloud storage capacity only, never AI model usage.',
        },
      },
      {
        title: { zh: '运行要求', en: 'Requirements' },
        desc: {
          zh: '最低：4GB 显存配 8GB 内存即可上课；推荐 NVIDIA 8GB 显存与 16GB 内存。Windows 10/11 64 位、Linux x64 或 macOS 14+；客户端需 Python 3.11+。Apple M 系列需 16GB 统一内存。',
          en: 'Minimum: 4 GB VRAM with 8 GB RAM is enough for a class; recommended is NVIDIA 8 GB VRAM with 16 GB RAM. Windows 10/11 64-bit, Linux x64 or macOS 14+; the client needs Python 3.11+. Apple M-series needs 16 GB unified memory.',
        },
      },
    ],
    stack: ['React 19', 'TypeScript', 'FastAPI', 'SQLite', 'Faster-Whisper', 'NLLB', 'CTranslate2', 'PyTorch'],
    gallery: [],
    notes: [
      {
        zh: '网页负责录音和阅读，听写、翻译与解析在你自己的算力客户端上运行，速度由那台电脑决定。没有可用的自有设备时，录音仍会保存，识别会等待。',
        en: 'The web app handles recording and reading; transcription, translation and analysis run on your own compute client, so speed depends on that computer. With no device available, recordings are still saved and recognition waits.',
      },
      {
        zh: '系统声音只在浏览器共享选择器实际提供音频轨道时可用，失败时不会偷偷改用麦克风。建议使用最新稳定版 Chrome 或 Edge。',
        en: 'System audio is only available when the browser’s share picker actually offers an audio track; it never silently falls back to the microphone. A current Chrome or Edge is recommended.',
      },
      {
        zh: '很旧的显卡可能无法使用当前固定的 PyTorch 和 CTranslate2；自检失败时把计算方案改成 CPU。大型听写、1.3B 翻译和 4B 解析需要独立显卡。Intel Mac 目前只能尝试听写。',
        en: 'Very old GPUs may not work with the pinned PyTorch and CTranslate2; if the self-check fails, switch the compute plan to CPU. Large dictation, 1.3B translation and 4B analysis need a discrete GPU. Intel Macs can currently only try dictation.',
      },
      {
        zh: '课堂录音可能受当地法律、学校制度和授课规则约束，录制前请取得教师、同学及机构要求的许可。',
        en: 'Lecture recording may be restricted by local law, school rules and teaching policies; obtain the permissions that teachers, classmates and your institution require before recording.',
      },
      {
        zh: '需要登录后使用，账号由 OwO! Identity 提供。',
        en: 'Sign-in is required; accounts are provided by OwO! Identity.',
      },
    ],
    license: {
      zh: '闭源项目，源码不公开。在线服务另有使用说明、数据保护、责任、推理说明与存储费用等条款，请以服务站点为准。第三方依赖与模型各自遵循其许可。',
      en: 'Closed-source: the source code is not public. The hosted service has its own usage notes, privacy, liability, inference and storage-fee terms; refer to the service site. Third-party dependencies and models follow their own licences.',
    },
    links: [
      { label: { zh: '打开 OwO! Recorder', en: 'Open OwO! Recorder' }, href: 'https://record.owoserver.com/', primary: true },
    ],
  },
  {
    id: 'deployer',
    name: 'OwO! Win Deployer',
    short: 'Win Deployer',
    openness: 'open',
    accent: '#16a34a',
    logo: asset('img/deployer/icon.png'),
    tagline: {
      zh: '一条命令复刻你的 Windows 开发环境',
      en: 'Replicate your Windows dev environment with one command',
    },
    summary: {
      zh: '在新机器上还原全部应用与配置，并内置终端、FTP、Cloudflare DDNS、局域网剪贴板与系统监控等运维工具。',
      en: 'Restore all apps and dotfiles on a new machine, with a terminal, FTP, Cloudflare DDNS, LAN clipboard sync and monitoring tools built in.',
    },
    version: 'v1.3.1.5',
    released: '2026-10-15',
    status: {
      label: { zh: '稳定 · 社区版与授权版', en: 'Stable · Community and licensed' },
      tone: 'stable',
    },
    platform: { zh: 'Windows · .NET 10 · WPF + CLI', en: 'Windows · .NET 10 · WPF + CLI' },
    scenario: { zh: '我要重装电脑', en: 'Setting up a new PC' },
    stats: [
      { value: '126', label: { zh: '应用 / 15 个分类', en: 'Apps / 15 categories' } },
      { value: '15', label: { zh: 'CLI 命令', en: 'CLI commands' } },
      { value: '3', label: { zh: '界面语言', en: 'UI languages' } },
    ],
    features: [
      {
        title: { zh: '软件安装中心', en: 'Software Install Center' },
        desc: {
          zh: '126 个软件、15 个分类，支持 winget、便携包、git、conda、VS Code 扩展、GitHub Release 等安装方式；幂等，可 dry-run，实时显示速度与剩余时间。',
          en: '126 packages in 15 categories across winget, portable, git, conda, VS Code extensions and GitHub releases; idempotent, with dry-run and live speed / ETA.',
        },
      },
      {
        title: { zh: '配置同步', en: 'Config sync' },
        desc: {
          zh: '应用与采集 VS Code、Git、SSH、环境变量、Windows Terminal、PowerShell、npm、conda、pip 的配置；导出时自动脱敏，应用前先备份。',
          en: 'Apply and capture config for VS Code, Git, SSH, env vars, Windows Terminal, PowerShell, npm, conda and pip; secrets are redacted on export and backups precede changes.',
        },
      },
      {
        title: { zh: '多机同步', en: 'Multi-machine sync' },
        desc: {
          zh: 'lock.json 锁定版本、按主机名映射 profile、迁移包 ZIP，并通过 git 执行 sync / save。',
          en: 'lock.json version pinning, hostname-to-profile mapping, a migration-kit ZIP, and sync / save over git.',
        },
      },
      {
        title: { zh: 'ConPTY 终端', en: 'ConPTY terminal' },
        desc: {
          zh: '带 VT100 / ANSI 模拟、真彩色与多标签会话；附带 Hacker-FX 荧光字符雨效果。',
          en: 'VT100 / ANSI emulation, true colour and multi-tab sessions, with an optional Hacker-FX phosphor effect.',
        },
      },
      {
        title: { zh: 'FTP / FTPS 与局域网剪贴板', en: 'FTP / FTPS and LAN clipboard' },
        desc: {
          zh: '自动生成 TLS 证书、TOFU 证书固定的 FTP 服务端与双栏客户端；剪贴板同步使用 6 位 PIN 互证与 AES-256-GCM 加密。',
          en: 'An FTP / FTPS server with an auto-generated TLS certificate and TOFU pinning, plus a dual-pane client; clipboard sync uses a 6-digit PIN with mutual proof and AES-256-GCM.',
        },
      },
      {
        title: { zh: '系统概览与维护', en: 'System overview and maintenance' },
        desc: {
          zh: '进程树、服务与启动项管理，NVMe / SATA / USB 的 SMART 健康度，SFC / DISM / chkdsk 与事件日志摘要。',
          en: 'Process tree, service and startup managers, SMART health for NVMe / SATA / USB drives, and SFC / DISM / chkdsk with an event-log digest.',
        },
      },
      {
        title: { zh: '开发者模式', en: 'Developer Mode' },
        desc: {
          zh: 'WSL 管理、可回滚的注册表调整、Cloudflare DDNS，以及 winget configure DSC 导出（可用于 Intune / GPO / SCCM）。',
          en: 'WSL manager, reversible registry tweaks, Cloudflare DDNS, and winget configure DSC export for Intune / GPO / SCCM.',
        },
      },
    ],
    stack: ['.NET 10', 'WPF', 'MVVM', 'ConPTY', 'winget', 'GitHub Actions'],
    quickstart: {
      title: { zh: 'CLI 常用命令', en: 'Everyday CLI commands' },
      lang: 'powershell',
      code: `# 命令别名：owodeploy（等同 owowindeployer）
owodeploy doctor     # 检查当前环境
owodeploy plan       # 预览将要执行的变更
owodeploy apply      # 执行安装与配置`,
    },
    gallery: [
      { src: asset('img/deployer/install-center.png'), alt: { zh: '软件安装中心', en: 'Install Center' } },
      { src: asset('img/deployer/process-manager.png'), alt: { zh: '进程管理', en: 'Process manager' } },
      { src: asset('img/deployer/export.png'), alt: { zh: '配置导出', en: 'Config export' } },
      { src: asset('img/deployer/settings.png'), alt: { zh: '设置', en: 'Settings' } },
    ],
    notes: [
      {
        zh: '采用开放核心模式：社区版免费，另有个人授权版与个人商业授权版，部分功能（如 Hosts 管理）为授权版专属。',
        en: 'Open-core model: the Community edition is free, with paid Personal and Commercial editions; some features (such as hosts-file management) are licensed-edition only.',
      },
      {
        zh: '局域网剪贴板在社区版中最多支持 2 台设备。',
        en: 'LAN clipboard sync is capped at 2 devices in the Community edition.',
      },
    ],
    license: {
      zh: '开源项目，源码公开。社区版采用 CC BY-NC-SA 4.0，仅限个人学习与研究，禁止商业使用；商业授权请通过作者博客联系。',
      en: 'Open source: the source code is public. The Community edition is CC BY-NC-SA 4.0, for personal study and research only with no commercial use; for commercial licences, contact the author through the blog.',
    },
    links: [
      { label: { zh: 'GitHub 仓库', en: 'GitHub repository' }, href: 'https://github.com/Tommy131/OwO-WinDeployer', primary: true },
      { label: { zh: '商业授权', en: 'Commercial licence' }, href: 'https://hanskijay.dev' },
    ],
  },
  {
    id: 'flight',
    name: 'OwO! FlightAssistant',
    short: 'FlightAssistant',
    openness: 'partial',
    accent: '#f59e0b',
    logo: asset('img/flight/logo.svg'),
    tagline: {
      zh: '连接模拟器与前端的飞行数据中间件',
      en: 'Flight-data middleware between your simulator and your frontend',
    },
    summary: {
      zh: '把 MSFS 与 X-Plane 的实时遥测、导航数据和 METAR 通过 REST 与 WebSocket 提供给前端，并内置 Web 电子飞行包。',
      en: 'Serves live telemetry, navigation data and METAR from MSFS and X-Plane over REST and WebSocket, with a built-in web Electronic Flight Bag.',
    },
    version: 'v1.2.4-beta',
    released: '2026-10-05',
    status: { label: { zh: 'Beta 测试版', en: 'Beta' }, tone: 'beta' },
    platform: { zh: 'Windows · 单文件 EXE（约 24 MB）', en: 'Windows · single EXE (~24 MB)' },
    scenario: { zh: '我在玩模拟飞行', en: 'Flight simulation' },
    stats: [
      { value: '2', label: { zh: '模拟器', en: 'Simulators' } },
      { value: '~500 ms', label: { zh: '遥测推送', en: 'Telemetry push' } },
      { value: '1', label: { zh: '个 EXE', en: 'Single EXE' } },
    ],
    features: [
      {
        title: { zh: '双模拟器支持', en: 'Two simulators' },
        desc: {
          zh: '通过 SimConnect 接入 MSFS 2020 / 2024，通过 UDP DataRef 接入 X-Plane 11 / 12。',
          en: 'MSFS 2020 / 2024 through SimConnect and X-Plane 11 / 12 through UDP DataRefs.',
        },
      },
      {
        title: { zh: '导航数据', en: 'Navigation data' },
        desc: {
          zh: '支持 AIRAC、模拟器内置数据库与 Little Navmap，可查询机场、跑道、停机位、频率与等待航线。',
          en: 'AIRAC, simulator-internal databases and Little Navmap, with queries for airports, runways, parking, frequencies and holds.',
        },
      },
      {
        title: { zh: '实时遥测', en: 'Live telemetry' },
        desc: {
          zh: 'WebSocket 约每 500 ms 推送位置、速度、发动机、燃油、操纵输入与 AI 交通。',
          en: 'A WebSocket pushes position, speeds, engines, fuel, control inputs and AI traffic roughly every 500 ms.',
        },
      },
      {
        title: { zh: '飞行阶段与告警', en: 'Flight phases and alerts' },
        desc: {
          zh: '识别滑行、起飞、爬升、巡航、下降、进近与着陆；按常规 / 警告 / 危险分级提示失速、超速、坡度、俯仰、下沉率与地形。',
          en: 'Detects taxi, takeoff, climb, cruise, descent, approach and landing; tiered normal / warning / danger alerts for stall, overspeed, bank, pitch, sink rate and terrain.',
        },
      },
      {
        title: { zh: 'METAR 解读', en: 'METAR translation' },
        desc: {
          zh: '多源获取 METAR 并翻译成白话，例如“风向 120°，风速 15 节”。',
          en: 'Fetches METAR from several sources and translates it into plain language, such as “Wind 120 degrees at 15 knots”.',
        },
      },
      {
        title: { zh: '内置 Web 电子飞行包', en: 'Built-in web EFB' },
        desc: {
          zh: '内嵌 React 前端：地图、EFB、简报、检查单、飞行日志、监控、机场搜索与工具箱。',
          en: 'An embedded React frontend with map, EFB, briefing, checklists, flight logs, monitoring, airport search and a toolbox.',
        },
      },
      {
        title: { zh: '终端向导', en: 'Terminal wizard' },
        desc: {
          zh: '基于 Bubble Tea 的 TUI，含首次引导、模拟器与 API 仪表盘、机场查询与日志查看。',
          en: 'A Bubble Tea TUI with onboarding, simulator and API dashboards, airport lookup and a log viewer.',
        },
      },
    ],
    stack: ['Go', 'Bubble Tea', 'Gorilla WebSocket', 'React 19', 'TypeScript', 'Leaflet', 'ECharts'],
    quickstart: {
      title: { zh: '启动后的默认入口', en: 'Default endpoints after launch' },
      lang: 'text',
      code: `# 双击 EXE 启动，默认自动打开浏览器
# 设置 OWO_NO_BROWSER=1 可关闭自动打开
http://127.0.0.1:18080         Web 界面
http://127.0.0.1:18080/api/v1  REST API
:18081                         WebSocket 遥测流`,
    },
    gallery: [
      { src: asset('img/flight/home.webp'), alt: { zh: '首页：实时飞行数据（演示数据）', en: 'Home: live flight data (demo data)' } },
      { src: asset('img/flight/map.webp'), alt: { zh: '地图：航迹与罗盘（演示数据）', en: 'Map: track and compass (demo data)' } },
      { src: asset('img/flight/monitor.webp'), alt: { zh: '监控：磁航向、起落架与趋势图（演示数据）', en: 'Monitor: heading, landing gear and trends (demo data)' } },
      { src: asset('img/flight/efb.webp'), alt: { zh: '飞行卡：阶段、关键门限与油量（演示数据）', en: 'EFB flight card: phase, key limits and fuel (demo data)' } },
      { src: asset('img/flight/briefing.webp'), alt: { zh: '简报：SimBrief 导入与航班输入', en: 'Briefing: SimBrief import and flight input' } },
      { src: asset('img/flight/settings.webp'), alt: { zh: '设置：语言、日志与应用存储', en: 'Settings: language, logs and app storage' } },
    ],
    notes: [
      {
        zh: '界面截图来自真实的中间件与 Web 前端，飞行数据由本地模拟的 X-Plane 数据源提供，为演示数据，并非真实飞行。',
        en: 'The screenshots come from the real middleware and web frontend, with flight data supplied by a locally simulated X-Plane source. They are demo data, not a real flight.',
      },
      {
        zh: '中间件本体闭源，只以编译后的单文件 EXE 分发；内置的 Web 前端是独立的开源项目。',
        en: 'The middleware itself is closed-source and ships only as a compiled single EXE; the embedded web frontend is a separate open-source project.',
      },
      {
        zh: '当前为 Beta 版本，接口与行为可能调整。',
        en: 'This is a beta release; APIs and behaviour may change.',
      },
      {
        zh: '接入 MSFS 需要 Windows。单个数据源失败时只会降级对应功能。',
        en: 'MSFS support requires Windows. If one data source fails, only the matching feature degrades.',
      },
    ],
    license: {
      zh: '部分开源：中间件闭源，源码不公开，仅以编译产物随发布页分发；内置的 Web 前端开源，采用 CC BY-NC-SA 4.0，仅限个人学习与研究，禁止商业使用。',
      en: 'Partly open source: the middleware is closed-source, with no public source code, and is distributed only as compiled releases; the embedded web frontend is open source under CC BY-NC-SA 4.0, for personal study and research only with no commercial use.',
    },
    links: [
      { label: { zh: '下载发布版', en: 'Download releases' }, href: 'https://github.com/Tommy131/OwO-FlightAssistant-Middleware/releases', primary: true },
      { label: { zh: '开源前端项目', en: 'Open-source frontend' }, href: 'https://github.com/Tommy131/OwO-FlightAssistant' },
    ],
  },
]

export const siteLinks = {
  blog: 'https://hanskijay.dev',
  email: 'support@owoblog.com',
}

export const getProduct = (id: string) => products.find((p) => p.id === id)

export const timeline = [...products]
  .filter((p) => p.released)
  .sort((a, b) => (b.released ?? '').localeCompare(a.released ?? ''))

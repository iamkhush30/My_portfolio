export type ProjectCategory = 'DevOps' | 'UI/UX Design';
export type ProjectTemplate = 'devops' | 'design';

export interface ProjectStage {
  name: string;
  tool: string;
  detail: string;
  iconName: string;
  responsibility?: string;
  command?: string;
  guardrail?: string;
}

export interface MetricItem {
  label: string;
  value: string;
  note?: string;
}

export interface SpecGroup {
  category: string;
  items: string[];
}

export interface ScreenItem {
  title: string;
  desc: string;
  iconName?: string;
  image?: string;
}

export interface ProofScreenTab {
  title: string;
  badge?: string;
  desc: string;
  image: string;
  highlights?: string[];
}

export interface EngineeringChallenge {
  id: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  impact: string;
}

export interface UXDecision {
  id: string;
  title: string;
  tag: string;
  overview: string;
  keyPoints: {
    title: string;
    detail: string;
  }[];
}

export interface IaCWorkflowStep {
  step: string;
  phase: string;
  command: string;
  action: string;
  guardrail: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  tagline: string;
  category: ProjectCategory;
  template: ProjectTemplate;
  role: string;
  date: string;
  tools: string[];
  summary: string;
  archivedParagraph?: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  figmaUrl?: string;
  hasLivePreview?: boolean;
  metrics: MetricItem[];
  // DevOps specific
  pipelineFlow?: string;
  stages?: ProjectStage[];
  breakdown?: { stage: string; action: string; detail: string }[];
  infrastructureSpecs?: SpecGroup[];
  codeSnippets?: { title: string; language: string; code: string }[];
  engineeringChallenges?: EngineeringChallenge[];
  iacWorkflow?: IaCWorkflowStep[];
  // Design specific
  challenge?: string;
  solution?: string;
  screens?: ScreenItem[];
  designSystemTokens?: {
    typography: string[];
    colors: { name: string; hex: string }[];
    tokensCount?: number;
  };
  keyFindings?: string[];
  proofSectionTitle?: string;
  proofSectionSubtitle?: string;
  proofSectionBadge?: string;
  proofScreens?: ProofScreenTab[];
  uxDecisions?: UXDecision[];
  // Placeholder markers
  isDraftSlot?: boolean;
  todoPlaceholders?: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: '01',
    slug: 'cicd-pipeline-ml-app',
    title: 'CI/CD Pipeline for an ML App',
    shortTitle: 'CI/CD Pipeline · ML App',
    subtitle: 'Automated CI/CD Delivery Pipeline for Heart Disease Prediction',
    tagline: 'DevOps & CI/CD Pipeline',
    category: 'DevOps',
    template: 'devops',
    role: 'DevOps Engineer',
    date: '2024',
    tools: ['GitLab', 'Jenkins', 'Docker', 'Nexus', 'Webhook', 'Bash'],
    summary:
      'Architected an automated CI delivery pipeline for a Machine Learning Heart Disease Prediction application. Automates the full path from developer code push in GitLab, through automated Jenkins builds and container packaging, to versioned Docker image storage in a private Sonatype Nexus Repository Manager.',
    archivedParagraph:
      'Built automated pipelines that handle everything from code commit to artifact publishing in Sonatype Nexus Repository Manager — eliminating manual handoffs and versioning every Docker image with unique Jenkins build IDs.',
    seoTitle: 'CI/CD Pipeline for ML App | Khush Makwana DevOps Case Study',
    seoDescription:
      'Technical breakdown of a production-style CI/CD pipeline using GitLab, Jenkins, Docker, and Nexus for a Heart Disease Machine Learning Prediction application.',
    image: '/assets/CICD-Pipeline.png',
    githubUrl: 'https://github.com/iamkhush30/HeartRisk-Predictor',
    hasLivePreview: false,
    metrics: [
      { label: 'Pipeline Automation', value: '100%', note: 'Zero manual handoffs from git commit to registry' },
      { label: 'Target Registry', value: 'Nexus', note: 'Isolated Docker repository with build-ID tags' },
      { label: 'Artifact Delivery', value: 'Nexus', note: 'Versioned container image tagged with Jenkins BUILD_ID' },
    ],
    pipelineFlow: 'GitLab → Jenkins → Docker → Nexus',
    stages: [
      {
        name: 'Source',
        tool: 'GitLab',
        detail: 'git push origin main',
        iconName: 'Gitlab',
        responsibility: 'Developer commits code changes and pushes to protected main branch, initiating automated pipeline trigger.',
        command: 'git push origin main',
        guardrail: 'Protected branch rules prevent unreviewed direct pushes to production branch.',
      },
      {
        name: 'Trigger',
        tool: 'Webhook',
        detail: 'HTTP POST event trigger',
        iconName: 'Zap',
        responsibility: 'GitLab dispatches an HTTP POST payload notifying the Jenkins controller of the new commit SHA.',
        command: 'POST /jenkins/project-webhook/',
        guardrail: 'Payload authentication via secret token ensures only authorized GitLab events trigger jobs.',
      },
      {
        name: 'Build',
        tool: 'Jenkins',
        detail: 'Jenkinsfile pipeline run',
        iconName: 'Settings',
        responsibility: 'Jenkins agent checks out source code, sets up Python environment, and compiles dependencies.',
        command: "Jenkinsfile · stage('Checkout & Build')",
        guardrail: 'Slim container C-toolchain compilation patch prevents missing native compiler failures.',
      },
      {
        name: 'Package',
        tool: 'Docker',
        detail: 'docker build & tag',
        iconName: 'Box',
        responsibility: 'Packages application code, ML inference weights, and runtime into a lean single-stage container image based on python:3.11-slim.',
        command: 'docker build -t heart-predict:${BUILD_ID} .',
        guardrail: 'Tags every container with unique Jenkins ${BUILD_ID} to prevent tag overwrite collisions.',
      },
      {
        name: 'Registry',
        tool: 'Nexus',
        detail: 'Private Docker repository',
        iconName: 'Database',
        responsibility: 'Authenticates securely and publishes tagged Docker image to private Sonatype Nexus registry.',
        command: 'docker push nexus:8082/heart-predict:${BUILD_ID}',
        guardrail: 'Scoped credential injection at point-of-push eliminates static session timeout failures.',
      },
    ],
    breakdown: [
      { stage: 'Source', action: 'Developer pushes code to GitLab repository', detail: 'git push origin main' },
      { stage: 'Trigger', action: 'GitLab webhook triggers Jenkins automation server', detail: 'POST /jenkins/project-webhook/' },
      { stage: 'Checkout', action: 'Jenkins agent pulls repository & checks dependencies', detail: "Jenkinsfile · stage('Checkout')" },
      { stage: 'Build', action: 'Container image built from Dockerfile specification', detail: 'docker build -t heart-predict:latest .' },
      { stage: 'Tag', action: 'Image tagged with unique Jenkins build execution ID', detail: 'nexus:8082/heart-predict:${BUILD_ID}' },
      { stage: 'Push', action: 'Final image pushed to private Nexus Docker registry', detail: 'docker push nexus:8082/heart-predict:${BUILD_ID}' },
    ],
    infrastructureSpecs: [
      {
        category: 'Application Stack',
        items: ['Frontend: React / Streamlit interface', 'Backend: Python Flask REST API', 'Engine: Pre-trained CatBoost & Scikit-Learn ML models'],
      },
      {
        category: 'CI/CD Architecture',
        items: ['GitLab Server with configured post-receive webhook', 'Jenkins Master controller executing declarative Jenkinsfile', 'Docker Engine for isolated, reproducible builds', 'Sonatype Nexus Repository Manager (OSS) for artifact hosting'],
      },
      {
        category: 'Security & Integrity',
        items: ['Registry authentication using scoped credential store', 'Isolated build agents preventing environment drift', 'Build failure notifications with audit logs'],
      },
    ],
    engineeringChallenges: [
      {
        id: '01',
        title: 'ML Dependency Compilation in Minimal Slim Container',
        category: 'Docker Build & C Toolchain',
        problem:
          'When compiling catboost, scikit-learn, and numpy on python:3.11-slim, pip install threw fatal compilation errors ("error: command \'gcc\' failed: No such file or directory") because lightweight slim base images omit native C compilers and header files.',
        solution:
          'Injected build-essential and gcc before dependency installation, followed immediately by apt cache cleanup (rm -rf /var/lib/apt/lists/*) and pip --no-cache-dir to prevent intermediate build artifacts from bloating the single-stage image.',
        codeSnippet: {
          language: 'dockerfile',
          code: `FROM python:3.11-slim
WORKDIR /app

RUN apt-get update && apt-get install -y \\
    build-essential \\
    gcc \\
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]`,
        },
        impact: '100% stable ML wheel compilation while maintaining minimal container footprint.',
      },
      {
        id: '02',
        title: 'Idempotent Teardown & Workspace Hygiene on CI Runners',
        category: 'Jenkins Automation & Container Lifecycle',
        problem:
          'During automated pipeline runs on Jenkins build agents, leftover test containers or stale local images from previous runs caused port conflicts and tag collisions. However, running docker stop or docker rmi on a clean runner where ml-container or ml-app did not exist returned exit code 1, prematurely aborting the build.',
        solution:
          'Appended safe exit status evaluation (|| exit 0) within the Jenkins pipeline cleanup steps, ensuring pre-build workspace teardown remains strictly idempotent across fresh runners and repeat builds before packaging and pushing to Nexus.',
        codeSnippet: {
          language: 'groovy',
          code: `stage('Clean & Teardown') {
    steps {
        sh '''
        docker stop ml-container || exit 0
        docker rm ml-container || exit 0
        docker rmi ml-app || exit 0
        '''
    }
}`,
        },
        impact: 'Zero false-positive pipeline aborts during clean starts, ensuring reliable builds before pushing to Nexus.',
      },
      {
        id: '03',
        title: 'Nexus Registry Token Expiration on Extended Runs',
        category: 'Artifact Registry & Authentication',
        problem:
          'Static Docker CLI login sessions or temporary registry tokens timed out during lengthy ML test and build cycles, causing the final artifact upload to fail with HTTP 401 Unauthorized.',
        solution:
          'Integrated Jenkins withCredentials wrapper with scoped usernamePassword binding (nexus-docker-auth), injecting authenticated Docker login dynamically at the exact point-of-push.',
        codeSnippet: {
          language: 'groovy',
          code: `withCredentials([usernamePassword(credentialsId: 'nexus-docker-auth', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
    sh "docker login -u \${USER} -p \${PASS} \${NEXUS_REGISTRY}"
    sh "docker push \${NEXUS_REGISTRY}/\${IMAGE_NAME}:\${BUILD_NUMBER}"
}`,
        },
        impact: 'Secured credentials and eliminated push authentication failures on long runs.',
      },
      {
        id: '04',
        title: 'Docker Daemon Socket Permissions on Jenkins Agent',
        category: 'CI/CD Agent Security & Daemon Access',
        problem:
          'The Jenkins service user lacked authorization to communicate with the Docker daemon pipe, returning "permission denied while trying to connect to the Docker daemon socket".',
        solution:
          'Configured the host daemon security context by granting the Jenkins service identity appropriate permissions and adding it to the authorized Docker security group, without exposing the runner to unsafe root privileges.',
        codeSnippet: {
          language: 'bash',
          code: `# Configure Jenkins runner permissions
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins`,
        },
        impact: 'Enabled secure, headless CI Docker automation without running Jenkins as root.',
      },
    ],
    todoPlaceholders: [],
  },

  {
    id: '02',
    slug: 'aws-terraform-infrastructure',
    title: 'Terraform-Provisioned AWS Infrastructure',
    shortTitle: 'AWS Terraform Infra',
    subtitle: 'Modular AWS Infrastructure as Code for Free-Tier Compute, S3, & DynamoDB',
    tagline: 'AWS Cloud & Infrastructure as Code',
    category: 'DevOps',
    template: 'devops',
    role: 'Cloud & DevOps Engineer',
    date: '2025',
    tools: ['Terraform (HCL)', 'AWS Provider', 'AWS EC2', 'AWS S3', 'DynamoDB', 'Nginx'],
    summary:
      'Architected and provisioned modular AWS cloud infrastructure in ap-south-1 (Mumbai) using Terraform (>= 1.5.0) and AWS Provider (~> 6.0). Features automated Canonical Ubuntu AMI resolution, Free-Tier-optimized EC2 instances bootstrapped with Nginx via user_data, encrypted and versioned S3 object storage with public access blocks, an on-demand DynamoDB table, and a multi-environment module architecture generating isolated dev, stg, and prd stacks.',
    seoTitle: 'Terraform AWS Infrastructure | Khush Makwana Cloud & DevOps',
    seoDescription:
      'Accurate breakdown of modular AWS infrastructure built with Terraform (>= 1.5.0, AWS Provider ~> 6.0) in ap-south-1: Dynamic Ubuntu AMI, EC2 with Nginx user_data, encrypted S3, on-demand DynamoDB, and multi-environment modules.',
    image: '/assets/Terraform-Provisioned AWS Infrastructure.png',
    githubUrl: 'https://github.com/iamkhush30/aws-terraform-infrastructure',
    hasLivePreview: false,
    isDraftSlot: false,
    metrics: [
      { label: 'Provisioning Mode', value: '100% IaC', note: 'Zero manual AWS console clicks · Pure HCL' },
      { label: 'Code Architecture', value: 'Modular HCL', note: 'DRY child module with multi-environment parity' },
      { label: 'Module Scope', value: 'dev · stg · prd', note: '3 environment stacks via ./my_app_infra_module' },
    ],
    pipelineFlow: 'Terraform CLI (>= 1.5.0) → Dynamic Canonical AMI → EC2 (Nginx) → Encrypted S3 → DynamoDB (On-Demand)',
    stages: [
      {
        name: 'Provider & Region',
        tool: 'AWS ~> 6.0',
        detail: 'ap-south-1 region constraint',
        iconName: 'Settings',
        responsibility: 'Locks AWS provider to modern ~> 6.0 constraints and configures isolated ap-south-1 (Mumbai) regional endpoints.',
        command: 'aws provider { region = "ap-south-1" }',
        guardrail: 'Strict provider version pinning prevents breaking syntax changes across Terraform CLI versions.',
      },
      {
        name: 'AMI Discovery',
        tool: 'data.aws_ami',
        detail: 'Dynamic Ubuntu 22.04 LTS (Canonical)',
        iconName: 'Layers',
        responsibility: 'Queries Canonical official AWS owner (099720109477) for the most recent Ubuntu Jammy 22.04 LTS HVM AMI.',
        command: 'data "aws_ami" "ubuntu" { most_recent = true }',
        guardrail: 'Dynamic discovery eliminates hardcoded regional AMI IDs and stale OS image errors.',
      },
      {
        name: 'Compute & Web',
        tool: 'EC2 & Nginx',
        detail: 't2.micro / t3.micro + user_data script',
        iconName: 'Box',
        responsibility: 'Provisions economical Free-Tier compute instance and bootstraps headless Nginx web server via automated user_data script.',
        command: 'aws_instance.my_app_ec2 { user_data = file(...) }',
        guardrail: 'Instance type regex validation (^t[23]\\.) guarantees adherence to AWS Free-Tier budget limits.',
      },
      {
        name: 'Object Storage',
        tool: 'AWS S3',
        detail: 'AES256 SSE · Versioning · 4x Public Block',
        iconName: 'Database',
        responsibility: 'Provisions private S3 bucket with default server-side encryption (AES-256) and state/asset versioning enabled.',
        command: 'aws_s3_bucket + aws_s3_bucket_public_access_block',
        guardrail: 'Explicit 4-layer public access block prevents accidental public data exposure.',
      },
      {
        name: 'NoSQL Table',
        tool: 'DynamoDB',
        detail: 'PAY_PER_REQUEST on-demand billing',
        iconName: 'Zap',
        responsibility: 'Provisions serverless DynamoDB table with partition key routing for fast key-value lookups.',
        command: 'aws_dynamodb_table { billing_mode = "PAY_PER_REQUEST" }',
        guardrail: 'On-demand capacity mode guarantees $0 idle hourly costs when no read/write traffic occurs.',
      },
    ],
    engineeringChallenges: [
      {
        id: '01',
        title: 'Dynamic AMI Resolution vs. Regional Hardcoding',
        category: 'AMI Lifecycle & Multi-Region Portability',
        problem:
          'Hardcoding Ubuntu AMI IDs directly in EC2 resource blocks breaks portability across AWS regions because AMI IDs differ by region and change as Canonical releases updated builds.',
        solution:
          'Implemented a dynamic data source (data.aws_ami.ubuntu) querying Canonical owner 099720109477 with most_recent = true and name filter for ubuntu-jammy-22.04-amd64-server-*. Terraform automatically resolves the latest available AMI at plan time.',
        impact: 'Eliminated manual AMI updates and eliminated deployment errors caused by stale or region-mismatched image IDs.',
      },
      {
        id: '02',
        title: 'Environment Drift in Multi-Tier Deployments',
        category: 'Modular IaC & Environment Parity',
        problem:
          'Duplicating EC2, S3, and DynamoDB resource definitions across separate dev, staging, and production files leads to configuration drift, hardcoded naming collisions, and unmaintainable code.',
        solution:
          'Architected a reusable child module (./my_app_infra_module) parameterized by my_env with strict variable validation. Composed root main.tf to instantiate dev-app, stg-app, and prd-app from a single source of truth, returning isolated public IP outputs.',
        impact: 'Enforced 100% environment parity with scoped resource naming while eliminating code duplication across all stages.',
      },
    ],
    infrastructureSpecs: [
      {
        category: 'Security Hardening Baseline',
        items: [
          'S3 4-Layer Public Access Block: all 4 public access vectors blocked (block_public_acls, block_public_policy, ignore_public_acls, restrict_public_buckets)',
          'S3 Server-Side Encryption (AES-256) & Object Versioning enabled by default',
          'Decoupled Security Group architecture: standalone ingress rules for HTTP (80) & SSH (22)',
          'SSH key pair authentication via km-cloud-key (khush-key.pub)',
        ],
      },
      {
        category: 'Cost Governance & Quota Protection',
        items: [
          'Free Tier EBS Protection: strict validation block capping instance_count between 1 and 3 (10GB gp3 root volume)',
          'Instance Type Guardrails: regex validation restricting compute to economical t2/t3 families (^t[23]\\.)',
          'Serverless On-Demand Pricing: DynamoDB PAY_PER_REQUEST billing ($0 idle infrastructure cost)',
          'Zero High-Cost Managed Services: no provisioned NAT Gateways or idle ALB hourly charges',
        ],
      },
    ],
    iacWorkflow: [
      {
        step: '01',
        phase: 'Pre-Flight Syntax & Schema Check',
        command: 'terraform fmt -check && terraform validate',
        action: 'Validates HCL formatting conventions, variable constraints, and AWS provider schema rules before initiating any cloud API calls.',
        guardrail: 'Catches syntax errors and missing required arguments locally with zero cloud delay.',
      },
      {
        step: '02',
        phase: 'Deterministic Plan Generation',
        command: 'terraform plan -out=tfplan',
        action: 'Diffs existing AWS state against configuration and writes a cryptographically locked execution binary.',
        guardrail: 'Pre-computes exact resource graph (+15 to add, 0 to change, 0 to destroy) with zero surprise destructions.',
      },
      {
        step: '03',
        phase: 'State-Locked Provisioning',
        command: 'terraform apply "tfplan"',
        action: 'Provisions child module resources (dev, stg, or prd) sequentially following the dependency graph (AMI -> SG/Key -> EC2 -> S3/DynamoDB).',
        guardrail: 'Applies only the inspected plan binary; state locking prevents concurrent apply collisions.',
      },
      {
        step: '04',
        phase: 'Telemetry & Smoke Verification',
        command: 'terraform output && curl -I http://<public_ip>',
        action: 'Extracts public IPv4 addresses and automated user_data bootstrap outputs to verify HTTP 200 OK on Nginx web server.',
        guardrail: 'Confirms compute instance and web server readiness immediately without AWS console log hunting.',
      },
      {
        step: '05',
        phase: 'Zero-Cost Controlled Teardown',
        command: 'terraform destroy',
        action: 'Reverses the dependency tree cleanly, terminating compute, storage buckets, and tables once validation testing concludes.',
        guardrail: 'Ensures no orphaned EBS volumes, elastic IPs, or idle services remain running on the AWS account.',
      },
    ],
    todoPlaceholders: [],
  },

  {
    id: '03',
    slug: 'preed-financial-intelligence',
    title: 'Preed · Financial Intelligence',
    shortTitle: 'Preed · Financial App',
    subtitle: 'AI-Powered Stock Prediction & Algorithmic Market Intelligence Platform',
    tagline: 'UI/UX Case Study',
    category: 'UI/UX Design',
    template: 'design',
    role: 'Lead UI/UX Designer & Frontend Engineer',
    date: '2024',
    tools: ['React.js', 'JavaScript', 'CSS Design Tokens', 'UI/UX Design', 'Data Visualization'],
    summary:
      'A full-featured AI-powered stock prediction web application engineered directly in React and JavaScript — combining algorithmic signal analysis, live portfolio tracking, and multi-stock comparison into a data-dense, dark-mode-first financial interface.',
    archivedParagraph:
      'Designed interfaces that are clear, functional, and visually deliberate — translated directly from information architecture into high-performance React components with modular state, responsive data tables, and dynamic financial charts.',
    seoTitle: 'Preed Financial Intelligence | Khush Makwana UI/UX Case Study',
    seoDescription:
      'UI/UX design and frontend case study for Preed: An AI-driven stock prediction dashboard engineered in React and JavaScript with real-time portfolio analytics.',
    image: '/assets/preed1.png',
    figmaUrl: 'https://www.figma.com',
    hasLivePreview: false,
    metrics: [
      { label: 'Prediction Accuracy', value: '87.5%', note: 'Verified across 24 logged prediction events' },
      { label: 'Core Modules', value: '5 Screens', note: 'Analysis, Dashboard, Portfolio, Compare, Logs' },
      { label: 'Design System', value: '28 Tokens', note: 'Curated colors, typography scales, spacing, & radius' },
    ],
    challenge:
      'Retail investors are often overwhelmed by cluttered financial dashboards, arcane signals, and opaque algorithmic predictions. The core challenge was distilling complex algorithmic signals and Indian market equity data into clear, actionable, confident recommendations without stripping away essential analytical depth.',
    solution:
      'Created a structured, dark-mode-first modular design system with high-contrast data visualization, clear BUY/HOLD/SELL signal hierarchies with confidence scoring, and dedicated workspaces for single-stock deep dives, portfolio tracking, and multi-asset comparisons.',
    screens: [
      {
        title: 'Prediction Analysis',
        desc: 'Core signal input engine returning BUY / HOLD / SELL recommendations with multi-factor confidence scoring, price targets, and algorithmic rationale.',
        iconName: 'BarChart2',
      },
      {
        title: 'Market Overview & Dashboard',
        desc: 'Comprehensive command center featuring top market gainers, active signals, portfolio snapshot, and real-time market sentiment telemetry.',
        iconName: 'LayoutDashboard',
      },
      {
        title: 'Portfolio Tracker',
        desc: 'Live tracking of active investments, portfolio valuation (₹54,309.1+), realized returns, and a candidate watchlist of analyzed stocks ready for entry.',
        iconName: 'Briefcase',
      },
      {
        title: 'Stock Comparison Matrix',
        desc: 'Side-by-side comparative analytics evaluating confidence, technical indicators (RSI, MACD), sentiment, and Kelly Criterion allocation sizing.',
        iconName: 'ArrowLeftRight',
      },
      {
        title: 'Prediction Logs & Audit History',
        desc: 'Audited chronological ledger tracking predictions vs actual outcomes, historical variance, accuracy rates (87.5%), and one-click CSV export.',
        iconName: 'FileText',
      },
    ],
    designSystemTokens: {
      typography: [
        'Inter Bold (Headings & Metrics)',
        'Inter Medium (UI Controls & Table Data)',
        'Inter Regular (Body & Subtitles)',
      ],
      colors: [
        { name: 'Dark Surface', hex: '#0B1326' },
        { name: 'Primary Blue', hex: '#2563EB' },
        { name: 'Bullish Green', hex: '#10B981' },
        { name: 'Hold Deep Blue', hex: '#1E3A8A' },
        { name: 'Return Amber', hex: '#F59E0B' },
        { name: 'Metric Purple', hex: '#A855F7' },
      ],
      tokensCount: 28,
    },
    keyFindings: [
      'Multi-factor confidence scoring (Sentiment, Technical, Fundamental) builds significantly higher user trust than a standalone target price.',
      'A dark-mode-first table architecture with sticky column headers and high-contrast badges allows rapid scanning across volatile market sessions.',
      'Clear position-sizing recommendations (Kelly Criterion, Fixed Fraction) help retail users manage downside risk alongside predictions.',
    ],
    proofSectionTitle: 'Production Interface',
    proofSectionSubtitle: '05 · Code Implementation & Visual Proof',
    proofSectionBadge: 'Built with React.js & JavaScript · Production Frontend Architecture',
    proofScreens: [
      {
        title: 'Dashboard',
        desc: 'Production dashboard view featuring multi-factor Signal Analysis (BUY 59%), available signal indicators (High Potential, Momentum Breakout), and algorithmic confidence factor progress metrics.',
        image: '/assets/preed/preed-dashboard.png',
        highlights: [
          'Recharts algorithmic Signal Analysis with confidence weighting',
          'Confidence factor metrics: Sentiment (32%), Technical (15%), & Fundamental (12%)',
          'Algorithmic recommendation rationale with priority tagging',
        ],
      },
      {
        title: 'Portfolio Tracker',
        desc: 'Real-time portfolio management view tracking overall portfolio valuation (₹54,309.1), total invested capital (₹50,000), total returns (+₹4,309.1), 95.0% prediction accuracy, and analyzed equity candidate table.',
        image: '/assets/preed/preed-portfolio-tracker.png',
        highlights: [
          'Dynamic KPI summary cards: Portfolio Value, Invested Capital, & Returns',
          'Analyzed stock candidate queue with direct BUY execution actions',
          'Historical tracking and performance metrics for active holdings',
        ],
      },
      {
        title: 'Stock Detailed Comparison',
        desc: 'Side-by-side comparative financial matrix evaluating Reliance, TCS, and Infosys across 12 quantitative metrics including Kelly Criterion position sizing, trend predictions, and sentiment scores.',
        image: '/assets/preed/preed-stock-comparison.png',
        highlights: [
          'Multi-asset comparative table across 12 quantitative dimensions',
          'Mathematical position sizing formulas (Kelly Criterion & Fixed Fraction)',
          'Dynamic stock selection chips supporting up to 6 simultaneous equities',
        ],
      },
    ],
    todoPlaceholders: [],
  },

  {
    id: '04',
    slug: 'online-electronics-store',
    title: 'Online Electronics Store',
    shortTitle: 'Electronics Store UX',
    subtitle: 'High-Conversion E-Commerce Mobile & Web Experience',
    tagline: 'E-Commerce UI/UX',
    category: 'UI/UX Design',
    template: 'design',
    role: 'Product Designer',
    date: '2024',
    tools: ['Figma', 'Wireframing', 'Prototyping', 'Mobile UX', 'Design Systems'],
    summary:
      'A high-conversion storefront designed with behavioral UX principles — precision-crafted product flows, micro-interactions, responsive category filtering, and a streamlined multi-step checkout architecture.',
    archivedParagraph:
      'Designed wireframes, product catalog architectures, and checkout funnel prototypes that remove friction and guide buyers clearly from discovery to purchase.',
    seoTitle: 'Online Electronics Store | Khush Makwana UI/UX Case Study',
    seoDescription:
      'E-commerce UI/UX case study: Mobile-first electronics storefront optimized for rapid product discovery, scannability, and frictionless checkout.',
    image: '/assets/Electronic-Store.png',
    figmaUrl: 'https://www.figma.com',
    hasLivePreview: false,
    metrics: [
      { label: 'Screen Flows', value: '20+ Screens', note: 'Catalog, product detail, cart, checkout, profile & more' },
      { label: 'Checkout Steps', value: '3 Steps', note: 'Reduced friction cart-to-order confirmation funnel' },
      { label: 'Responsive Layout', value: 'Mobile-First', note: 'Optimized touch targets and bottom sheet drawers' },
    ],
    challenge:
      'Electronics consumers demand detailed technical specs, comparative pricing, and verified reviews without getting bogged down in messy specification tables during quick mobile purchasing.',
    solution:
      'Designed a scannable spec-card hierarchy, sticky buy-box on mobile viewports, rapid filter drawer, and a transparent 3-step checkout with instant address validation.',
    screens: [
      {
        title: 'Authentication & Guided Onboarding',
        desc: 'Clean sign-in and sign-up flows with social logins and passwordless authentication.',
        iconName: 'User',
      },
      {
        title: 'Home & Category Discovery',
        desc: 'Scannable product grid with horizontal category pills, promotional banners, and quick-add actions.',
        iconName: 'Layers',
      },
      {
        title: 'Real-Time Search & Faceted Filtering',
        desc: 'Instant search with suggestions, recent searches, and multi-facet filtering (brand, price, specs).',
        iconName: 'Zap',
      },
      {
        title: 'Product Deep Dive & Spec Matrix',
        desc: 'High-res image gallery, key highlights, expandable technical specifications, and verified buyer reviews.',
        iconName: 'Smartphone',
      },
      {
        title: 'Cart & Seamless Checkout',
        desc: 'Streamlined checkout funnel with shipping estimate, coupon code validation, and order tracking.',
        iconName: 'LayoutDashboard',
      },
      {
        title: 'Profile, Wishlist & Many More',
        desc: 'Comprehensive auxiliary flows including user wishlist, order tracking ledger, saved addresses, and profile settings across 15+ mobile screens.',
        iconName: 'Sparkles',
      },
    ],
    designSystemTokens: {
      typography: [
        'Roboto Bold (Headers & Product Titles)',
        'Roboto Medium (Pricing & Navigation Controls)',
        'Roboto Regular (Body & Spec Descriptions)',
      ],
      colors: [
        { name: 'Brand Amber Header', hex: '#FF9800' },
        { name: 'Primary Action Orange', hex: '#ED7C1E' },
        { name: 'Electric Price Blue', hex: '#2196F3' },
        { name: 'Wishlist Navy Blue', hex: '#0D47A1' },
        { name: 'Dark Mode Surface', hex: '#09031B' },
        { name: 'Pure White Surface', hex: '#FFFFFF' },
      ],
    },
    keyFindings: [
      'Sticky purchase actions on mobile increased mock checkout completions significantly.',
      'Collapsible spec accordions kept the product page clean while remaining accessible for power users.',
    ],
    proofSectionTitle: 'Key UX Decisions & Mobile Architecture',
    proofSectionSubtitle: '05 · Architectural Strategy',
    uxDecisions: [
      {
        id: '01',
        title: 'Dual-Theme Contrast Architecture',
        tag: 'Visual Ergonomics & Hardware Clarity',
        overview:
          'Consumer electronics (cameras, smartphones, audio gear) are mostly dark hardware. In standard dark mode, dark products blend into dark backgrounds and lose contour clarity.',
        keyPoints: [
          {
            title: 'High-Contrast White Card Framing',
            detail:
              'Product imagery is mounted on clean white cards (#FFFFFF) inside the dark theme (#09031B), keeping dark hardware edges, lenses, and finishes instantly recognizable.',
          },
          {
            title: 'Dedicated Electric Price Accent',
            detail:
              'All pricing is pinned to vibrant sky blue (#2196F3), ensuring clear visual hierarchy and immediate price recognition across both light and dark themes.',
          },
          {
            title: 'Adaptive Interactive Controls',
            detail:
              'Filled royal blue action buttons in light mode seamlessly transition to crisp white outline controls in dark mode to minimize visual fatigue.',
          },
        ],
      },
      {
        id: '02',
        title: 'Mobile Purchase & Action Hierarchy',
        tag: 'Conversion & Ergonomics',
        overview:
          'Engineered for natural one-handed thumb ergonomics, eliminating purchase hesitation while catering simultaneously to immediate buyers and bookmarkers.',
        keyPoints: [
          {
            title: 'Unified Action Row',
            detail:
              'Price tag, wishlist heart button (#0D47A1), and primary Add to Cart CTA (#ED7C1E) are grouped on a single horizontal row for instant evaluation without scrolling.',
          },
          {
            title: 'Dual-Intent Action Placement',
            detail:
              'Placing the wishlist action directly alongside Add to Cart prevents drop-off by giving undecided shoppers a frictionless 1-tap save alternative.',
          },
          {
            title: 'Digestible Product Bullet Highlights',
            detail:
              'Replaced dense technical specification tables with scannable bullet points, communicating key hardware value before the full spec breakdown.',
          },
        ],
      },
    ],
    todoPlaceholders: [
      'TODO: Add direct Figma link for the mobile prototype',
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAdjacentProjects(currentSlug: string): {
  prev: ProjectItem;
  next: ProjectItem;
} {
  const index = PROJECTS.findIndex((p) => p.slug === currentSlug);
  const prevIndex = (index - 1 + PROJECTS.length) % PROJECTS.length;
  const nextIndex = (index + 1) % PROJECTS.length;
  return {
    prev: PROJECTS[prevIndex],
    next: PROJECTS[nextIndex],
  };
}

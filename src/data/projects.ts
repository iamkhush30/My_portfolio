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
    subtitle: 'Automated CI Pipeline for Heart Disease Prediction',
    tagline: 'DevOps · CI/CD & Cloud Infrastructure',
    category: 'DevOps',
    template: 'devops',
    role: 'DevOps Engineer',
    date: '2024',
    tools: ['GitHub', 'Jenkins', 'Docker', 'Pytest', 'Nexus', 'AWS ECR', 'AWS EC2', 'Terraform', 'SSM'],
    summary:
      'Built a CI pipeline for a Flask-based Heart Disease Prediction app. Jenkins runs the pytest suite for REST endpoints and ML feature schemas and aborts on failure, builds a Docker image, pushes build-number and latest tags to a private Sonatype Nexus registry and AWS ECR, and replaces the running container on port 5000. Terraform provisions the AWS side, including ECR, an EC2 host with Docker and SSM access, and an IAM deployment identity. The backend and React/nginx UI run together on AWS, where deployment is currently manual.',
    archivedParagraph:
      'Automated code validation, Docker image packaging, Nexus and AWS ECR publishing, and local container replacement for a Heart Disease Machine Learning API — with build-number and latest tags for traceable releases.',
    seoTitle: 'CI/CD Pipeline for ML App | Khush Makwana DevOps Case Study',
    seoDescription:
      'Technical breakdown of the Jenkins CI/CD pipeline using Pytest, Docker, Sonatype Nexus, AWS ECR, Terraform, and local container deployment for a Heart Disease Machine Learning application.',
    image: '/assets/CICD-Pipeline.png',
    githubUrl: 'https://github.com/iamkhush30/HeartRisk-Predictor',
    hasLivePreview: false,
    metrics: [
      { label: 'Pipeline Automation', value: 'Automated CI', note: 'Test → build → push on each pipeline run' },
      { label: 'Target Registries', value: 'Dual Registry', note: 'Nexus + AWS ECR · build-number and latest tags' },
      { label: 'AWS Deployment', value: 'Manual', note: 'CI is automated; AWS deployment is performed manually' },
    ],
    pipelineFlow: 'Source → Trigger → Checkout → Pytest in venv (REST & ML Schemas) → Docker Build → Tag (BUILD_NUMBER + latest) → Push to Nexus & ECR → Replace Local Container on :5000',
    stages: [
      {
        name: 'Source & Trigger',
        tool: 'GitHub',
        detail: 'Source change & pipeline trigger',
        iconName: 'Github',
        responsibility: 'Provides the application source that starts the Jenkins pipeline.',
        command: 'Push to main',
        guardrail: 'Source: GitHub repository. Jenkins job trigger settings control when a source change starts this pipeline.',
      },
      {
        name: 'Checkout',
        tool: 'Jenkins SCM',
        detail: 'Repository source checkout',
        iconName: 'Settings',
        responsibility: 'Checks out the Jenkinsfile and project source before running the declarative pipeline stages.',
        command: 'Pipeline script from SCM',
        guardrail: 'Jenkins checks out the repository at the configured branch/revision and runs the Jenkinsfile found in that checkout.',
      },
      {
        name: 'Jenkins',
        tool: 'Jenkins Declarative Pipeline',
        detail: 'SCM checkout & stage orchestration',
        iconName: 'Settings',
        responsibility: 'Checks out the repository and executes the Jenkinsfile stages sequentially on the Jenkins Windows agent.',
        command: 'Jenkinsfile',
        guardrail: 'The Jenkinsfile defines one Windows agent pipeline with sequential Test, Build, Nexus, ECR, and local container stages.',
      },
      {
        name: 'Run Unit & Schema Tests',
        tool: 'Python & Pytest',
        detail: 'API and schema validation',
        iconName: 'Activity',
        responsibility: 'Creates or reuses a workspace virtual environment, installs pinned and current dependencies, and runs test_app.py before packaging.',
        command: 'venv\\Scripts\\python -m pytest test_app.py -v',
        guardrail: 'The stage uses a workspace venv, installs requirements.txt and pytest with retry/timeout flags, checks errorlevel, and has a 30-minute timeout.',
      },
      {
        name: 'Build Docker Image',
        tool: 'Docker',
        detail: 'python:3.11-slim image',
        iconName: 'Box',
        responsibility: 'Packages the Flask API, the cardio model bundle, custom unpickler code, and runtime dependencies into an ml-app image.',
        command: 'docker build -t ml-app .',
        guardrail: 'The Dockerfile uses python:3.11-slim, installs build-essential and gcc, copies requirements before source, and has a 40-minute build timeout.',
      },
      {
        name: 'Push to Nexus',
        tool: 'Sonatype Nexus',
        detail: 'nexus-docker-repo · host.docker.internal:8082',
        iconName: 'Database',
        responsibility: 'Authenticates with Jenkins credentials, tags the image with BUILD_NUMBER and latest, and pushes both tags to Nexus.',
        command: 'docker push host.docker.internal:8082/nexus-docker-repo/ml-app:${BUILD_NUMBER}',
        guardrail: 'Nexus credentials use Jenkins credentials ID nexus-credentials; docker login receives the password through stdin, and push exit codes are checked.',
      },
      {
        name: 'Push to AWS ECR',
        tool: 'Amazon ECR',
        detail: 'ap-south-1 / ml-app',
        iconName: 'Database',
        responsibility: 'Uses Jenkins AWS credentials to authenticate to ECR, then publishes the build-number and latest tags to the account repository.',
        command: 'aws ecr get-login-password --region ap-south-1',
        guardrail: 'AWS credentials use Jenkins ID aws-jenkins-creds, the account ID and ap-south-1 ECR endpoint are resolved in the batch script, and the stage has a 90-minute timeout.',
      },
      {
        name: 'Remove Older',
        tool: 'Local Container Replacement',
        detail: 'Replace ml-container · port 5000',
        iconName: 'Zap',
        responsibility: 'Removes an existing ml-container if present, then starts the newly built ml-app image as a local Docker container.',
        command: 'docker run -d -p 5000:5000 --name ml-container ml-app',
        guardrail: 'The stage removes the existing ml-container and starts ml-app on port 5000; docker image prune -f runs in the pipeline post-always block.',
      },
    ],
    breakdown: [
      { stage: 'Source', action: 'Source change is made in the GitHub repository', detail: 'Push/commit to main' },
      { stage: 'Trigger', action: 'A GitHub source change starts the Jenkins pipeline', detail: 'Configured in the Jenkins job' },
      { stage: 'Checkout', action: 'Jenkins checks out the repository source', detail: 'Jenkinsfile and application files' },
      { stage: 'Jenkins', action: 'Declarative Jenkinsfile orchestrates the pipeline', detail: 'SCM checkout · Windows Jenkins agent' },
      { stage: 'Test', action: 'Workspace virtualenv runs Pytest before Docker packaging', detail: 'test_app.py · Flask REST endpoints and ML feature schemas' },
      { stage: 'Build', action: 'Docker builds the Flask ML container', detail: 'docker build -t ml-app .' },
      { stage: 'Nexus', action: 'Build-number and latest tags are pushed to Nexus', detail: 'host.docker.internal:8082/nexus-docker-repo/ml-app' },
      { stage: 'ECR', action: 'Build-number and latest tags are pushed to AWS ECR', detail: 'ap-south-1 · ml-app repository' },
      { stage: 'Local replace', action: 'Existing ml-container is removed and recreated', detail: 'ml-container · port 5000' },
      { stage: 'Terraform AWS', action: 'Terraform provisions the AWS deployment foundation', detail: 'ECR · EC2 · Docker · SSM · Jenkins IAM identity' },
    ],
    infrastructureSpecs: [
      {
        category: 'Application Stack',
        items: ['Frontend: React application served with nginx', 'Backend: Python Flask REST API', 'Deployment: Backend and React/nginx UI run together on AWS with manual deployment'],
      },
      {
        category: 'CI/CD Architecture',
        items: ['Jenkins declarative pipeline with a workspace virtual environment', 'Pytest runs Flask /api/health and /api/predict tests plus ML feature schema checks before image build', 'Pytest failure aborts the pipeline before Docker packaging', 'Docker Engine for reproducible backend image builds', 'Sonatype Nexus private Docker repository and AWS ECR for build-number/latest artifacts'],
      },
      {
        category: 'Security & Integrity',
        items: ['Jenkins username/password credentials injected withCredentials', 'Docker registry passwords passed through --password-stdin', 'AWS IAM identity limited to ECR and SSM actions', 'Terraform EC2 metadata tokens required and root storage encrypted'],
      },
      {
        category: 'Terraform AWS Provisioning',
        items: ['Terraform >= 1.5 and AWS provider ~> 5.0 provision resources in ap-south-1', 'Amazon Linux 2023 EC2 host in the default VPC with Docker and 2 GB swap', 'ECR repository ml-app with scan-on-push and last-2-images lifecycle policy', 'EC2 IAM profile with SSM managed access and ECR read-only access', 'Dedicated Jenkins IAM user with ECR push/login and SSM send-command permissions', 'AWS deployment is currently manual; the Jenkinsfile does not run an EC2 deployment stage'],
      },
    ],
    engineeringChallenges: [
      {
        id: '01',
        title: 'CatBoost Dependency Compilation in a Slim Docker Image',
        category: 'Docker Build & C Toolchain',
        problem:
          'The python:3.11-slim base image does not include the native build tools needed for dependencies such as CatBoost.',
        solution:
          'Installed build-essential and gcc before installing Python requirements, then cleaned the apt package lists. The Dockerfile remains single-stage and installs from requirements.txt with pip --no-cache-dir.',
        impact: 'The Docker build can install the required ML dependencies without measured claims about image footprint or wheel compilation.',
      },
      {
        id: '02',
        title: 'Jenkins Service Account Couldn’t See Python or Docker',
        category: 'Jenkins on Windows & PATH',
        problem:
          'Jenkins ran as a Windows service (nt authority\\system), so stages failed with "python" is not recognized as an internal or external command and later "docker" is not recognized, even though both worked in my terminal. After the PATH fix, docker build still failed with open //./pipe/docker_engine: The system cannot find the file specified, because Docker Desktop’s engine lives in my user session.',
        solution:
          'Added a debug stage with whoami and echo %PATH% to confirm the account, set PATH once in the Jenkinsfile environment block, and pointed Jenkins at Docker’s local TCP endpoint with DOCKER_HOST. I kept that endpoint local-only, since it has no authentication.',
        impact: 'Jenkins now resolves both Python and Docker consistently and can reach the Docker Desktop engine.',
      },
      {
        id: '03',
        title: 'Dependency Downloads Timing Out on a Slow Connection',
        category: 'Python & Pip',
        problem:
          'The catboost download (about 100 MB) ran at about 150 kB/s and failed with ReadTimeoutError: HTTPSConnectionPool(host=\'files.pythonhosted.org\'). pytest never got installed, so the test stage failed after about 5 minutes.',
        solution:
          'Moved installs into a workspace virtualenv that later builds reuse, raised the limits with --default-timeout=300 --retries 10, and added stage timeouts so a stuck download can’t hang the pipeline. The Jenkins Docker build runs without a --no-cache override, while the Dockerfile copies requirements.txt before the application source so Docker can reuse the dependency layer.',
        impact: 'Dependency installation is more resilient, reusable, and bounded on slow connections.',
      },
      {
        id: '04',
        title: 'A Green Pipeline That Hid Failures',
        category: 'Pipeline Reliability',
        problem:
          'My first Nexus stage was wrapped in catchError(buildResult: \'SUCCESS\'), so a failed push left the stage orange while the build stayed green. The old container was also removed before the tests ran, so a failing build could take down a working deployment.',
        solution:
          'Removed catchError, moved Pytest to the start of the pipeline, and ordered Nexus and ECR pushes before local container replacement. Login and registry push failures are checked explicitly, and Docker credentials are passed with --password-stdin so passwords stay out of logs.',
        impact: 'Pipeline status now matches command outcomes, tests run first, and deployment is protected from failed pushes.',
      },
      {
        id: '05',
        title: 'Nexus Refused to Overwrite the latest Tag',
        category: 'Registry Policy',
        problem:
          'The first build pushed fine, but the next one failed with error from registry: ... cannot be updated as asset already exists and redeploy is not allowed.',
        solution:
          'Tagged each image with its build number plus a moving latest, and changed the repository’s deployment policy to allow redeploy. Build-number tags stay as rollback points.',
        impact: 'Repeated deployments work with a moving latest tag while preserving immutable build-number rollback points.',
      },
      {
        id: '06',
        title: 'Disk Space Disappearing',
        category: 'Docker Storage Management',
        problem:
          'After setting up Jenkins, Nexus and Docker, free disk dropped from about 75 GB to 58 GB. docker system df showed 5.6 GB of images, 3.4 GB of it reclaimable (duplicate test tags).',
        solution:
          'Removed the extra registry tags after each push with docker rmi and added docker image prune -f to the pipeline’s post step. Stale registry tags are cleaned without using prune -a, preserving cached Docker layers. Terraform applies an ECR lifecycle policy that keeps the last 2 images.',
        impact: 'Duplicate and stale test images are cleaned up without discarding reusable cached layers.',
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

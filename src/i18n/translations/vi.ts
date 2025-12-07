import { Translations } from './en';

export const vi: Translations = {
  // Common
  common: {
    getStarted: 'Bắt đầu',
    signIn: 'Đăng nhập',
    signUp: 'Đăng ký',
    logout: 'Đăng xuất',
    loading: 'Đang tải...',
    submit: 'Gửi',
    cancel: 'Hủy',
    save: 'Lưu',
    delete: 'Xóa',
    edit: 'Sửa',
    view: 'Xem',
    copy: 'Sao chép',
    copied: 'Đã sao chép!',
    learnMore: 'Tìm hiểu thêm',
    viewAll: 'Xem tất cả',
    perMonth: '/tháng',
  },

  // Navigation
  nav: {
    features: 'Tính năng',
    pricing: 'Bảng giá',
    docs: 'Tài liệu',
    api: 'API',
    dashboard: 'Bảng điều khiển',
    apiKeys: 'API Keys',
    statistics: 'Thống kê',
    billing: 'Thanh toán',
    profile: 'Hồ sơ',
    account: 'Tài khoản',
  },

  // Hero Section
  hero: {
    badge: 'API Geocoding cho Lập trình viên',
    title: 'Chuyển đổi',
    titleHighlight: 'Địa chỉ',
    titleEnd: 'thành Tọa độ',
    description: 'API geocoding mạnh mẽ, nhanh chóng và đáng tin cậy. Tìm kiếm vị trí, chuyển đổi ngược tọa độ và xây dựng ứng dụng nhận biết vị trí dễ dàng.',
    startTrial: 'Dùng thử miễn phí',
    viewGithub: 'Xem trên GitHub',
    stats: {
      requests: 'Yêu cầu API/Ngày',
      uptime: 'SLA Uptime',
      response: 'Thời gian phản hồi TB',
    },
  },

  // Features Section
  features: {
    badge: 'Tính năng',
    title: 'Mọi thứ bạn cần cho',
    titleHighlight: 'trí tuệ vị trí',
    description: 'Giải pháp geocoding hoàn chỉnh với các tính năng mạnh mẽ để xây dựng ứng dụng nhận biết vị trí.',
    items: {
      forwardGeocoding: {
        title: 'Geocoding Xuôi',
        description: 'Chuyển đổi địa chỉ và tên địa điểm thành tọa độ địa lý với độ chính xác cao.',
      },
      reverseGeocoding: {
        title: 'Geocoding Ngược',
        description: 'Lấy thông tin địa chỉ chi tiết từ tọa độ vĩ độ và kinh độ.',
      },
      osmData: {
        title: 'Dữ liệu OpenStreetMap',
        description: 'Được hỗ trợ bởi dữ liệu OSM toàn diện với cập nhật thường xuyên cho phạm vi toàn cầu.',
      },
      apiKeyManagement: {
        title: 'Quản lý API Key',
        description: 'Tạo và quản lý nhiều API key với theo dõi sử dụng riêng biệt.',
      },
      usageAnalytics: {
        title: 'Phân tích Sử dụng',
        description: 'Bảng điều khiển thời gian thực hiển thị mức sử dụng API, xu hướng và chỉ số hiệu suất.',
      },
      highPerformance: {
        title: 'Hiệu suất Cao',
        description: 'Được xây dựng với Java 21 và tối ưu hóa cho thời gian phản hồi dưới 50ms.',
      },
      rateLimiting: {
        title: 'Giới hạn Tốc độ',
        description: 'Giới hạn tốc độ tích hợp với giới hạn có thể cấu hình theo gói và API key.',
      },
      globalCoverage: {
        title: 'Phạm vi Toàn cầu',
        description: 'Hỗ trợ địa chỉ trên toàn thế giới với tên địa điểm đa ngôn ngữ.',
      },
    },
  },

  // CTA Section
  cta: {
    title: 'Sẵn sàng bắt đầu?',
    description: 'Tham gia cùng hàng nghìn nhà phát triển đang sử dụng GeoResolve để cung cấp năng lượng cho các ứng dụng dựa trên vị trí của họ. Bắt đầu với gói miễn phí ngay hôm nay.',
    startTrial: 'Dùng thử miễn phí',
    starGithub: 'Star trên GitHub',
    noCreditCard: 'Không cần thẻ tín dụng • 100 yêu cầu miễn phí mỗi ngày',
  },

  // Pricing Section
  pricing: {
    badge: 'Bảng giá',
    title: 'Giá cả đơn giản,',
    titleHighlight: 'minh bạch',
    description: 'Chọn gói phù hợp với nhu cầu của bạn. Tất cả các gói đều bao gồm tính năng geocoding cốt lõi.',
    mostPopular: 'Phổ biến nhất',
    requestsPerMin: 'Yêu cầu/phút',
    requestsPerDay: 'Yêu cầu/ngày',
    apiKeys: 'API Keys',
    contactSales: 'Liên hệ Bán hàng',
    subscribe: 'Đăng ký',
    plans: {
      free: {
        name: 'Miễn phí',
        description: 'Hoàn hảo để thử nghiệm và dự án nhỏ',
      },
      basic: {
        name: 'Cơ bản',
        description: 'Cho ứng dụng đang phát triển',
      },
      pro: {
        name: 'Pro',
        description: 'Cho ứng dụng chuyên nghiệp',
      },
      enterprise: {
        name: 'Doanh nghiệp',
        description: 'Cho ứng dụng quy mô lớn',
      },
    },
    features: {
      forwardGeocoding: 'Geocoding xuôi',
      reverseGeocoding: 'Geocoding ngược',
      basicSupport: 'Hỗ trợ cơ bản',
      emailSupport: 'Hỗ trợ qua email',
      prioritySupport: 'Hỗ trợ ưu tiên',
      dedicatedSupport: 'Hỗ trợ riêng',
      apiAnalytics: 'Phân tích API',
      advancedAnalytics: 'Phân tích nâng cao',
      dataImport: 'Nhập dữ liệu',
      dataImportLimit: 'Nhập dữ liệu (5/tháng)',
      customDataImport: 'Nhập dữ liệu tùy chỉnh',
      webhooks: 'Webhooks',
      everythingInPro: 'Mọi thứ trong Pro',
      unlimitedRequests: 'Yêu cầu không giới hạn',
      slaGuarantee: 'Đảm bảo SLA',
      onPremise: 'Tùy chọn On-premise',
    },
  },

  // Footer
  footer: {
    description: 'API geocoding mã nguồn mở được hỗ trợ bởi dữ liệu OpenStreetMap. Nhanh, đáng tin cậy và thân thiện với nhà phát triển.',
    product: 'Sản phẩm',
    resources: 'Tài nguyên',
    company: 'Công ty',
    documentation: 'Tài liệu',
    apiReference: 'Tham khảo API',
    status: 'Trạng thái',
    changelog: 'Nhật ký thay đổi',
    blog: 'Blog',
    community: 'Cộng đồng',
    about: 'Giới thiệu',
    contact: 'Liên hệ',
    privacy: 'Quyền riêng tư',
    terms: 'Điều khoản',
    allRightsReserved: 'Bảo lưu mọi quyền.',
  },

  // Auth
  auth: {
    login: {
      title: 'Chào mừng trở lại',
      description: 'Đăng nhập vào tài khoản GeoResolve của bạn',
      username: 'Tên người dùng',
      usernamePlaceholder: 'Tên người dùng của bạn',
      usernameError: 'Tên người dùng phải có ít nhất 3 ký tự',
      email: 'Email',
      password: 'Mật khẩu',
      passwordPlaceholder: 'Mật khẩu của bạn',
      passwordError: 'Mật khẩu phải có ít nhất 6 ký tự',
      rememberMe: 'Ghi nhớ đăng nhập',
      forgotPassword: 'Quên mật khẩu?',
      noAccount: 'Chưa có tài khoản?',
      signUp: 'Đăng ký',
      orContinueWith: 'Hoặc tiếp tục với',
      loginFailed: 'Đăng nhập thất bại',
      loginError: 'Đã xảy ra lỗi khi đăng nhập',
    },
    register: {
      title: 'Tạo tài khoản',
      description: 'Bắt đầu dùng thử miễn phí ngay hôm nay',
      username: 'Tên người dùng',
      usernamePlaceholder: 'Chọn tên người dùng',
      usernameError: 'Tên người dùng phải có ít nhất 3 ký tự',
      email: 'Email',
      emailPlaceholder: 'email@example.com',
      emailError: 'Email không hợp lệ',
      password: 'Mật khẩu',
      passwordPlaceholder: 'Tạo mật khẩu',
      passwordError: 'Mật khẩu phải có ít nhất 8 ký tự',
      confirmPassword: 'Xác nhận mật khẩu',
      confirmPasswordPlaceholder: 'Xác nhận mật khẩu của bạn',
      passwordMismatch: 'Mật khẩu không khớp',
      agreeTerms: 'Tôi đồng ý với Điều khoản Dịch vụ và Chính sách Quyền riêng tư',
      haveAccount: 'Đã có tài khoản?',
      signIn: 'Đăng nhập',
      orContinueWith: 'Hoặc tiếp tục với',
      createAccount: 'Tạo tài khoản',
      registerFailed: 'Đăng ký thất bại',
      registerError: 'Đã xảy ra lỗi khi đăng ký',
      termsError: 'Bạn phải chấp nhận điều khoản và điều kiện',
    },
  },

  // Dashboard
  dashboard: {
    welcome: 'Chào mừng trở lại',
    overview: 'Tổng quan',
    totalRequests: 'Tổng Yêu cầu',
    apiKeys: 'API Keys',
    currentPlan: 'Gói hiện tại',
    balance: 'Số dư',
    recentActivity: 'Hoạt động gần đây',
    quickActions: 'Thao tác nhanh',
    createApiKey: 'Tạo API Key',
    viewStatistics: 'Xem thống kê',
    upgradePlan: 'Nâng cấp gói',
    addFunds: 'Nạp tiền',
  },

  // Language
  language: {
    en: 'English',
    vi: 'Tiếng Việt',
    select: 'Chọn ngôn ngữ',
  },
};


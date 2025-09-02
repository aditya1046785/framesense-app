const en = {
  common: {
    backToHome: 'Back to Home',
    whatYouNeed: "Here's what you'll need:",
    goodLighting: 'Good lighting and a clear view of your face.',
    referenceOptional: 'A reference object is optional but improves accuracy.',
    privacyFirst: 'Privacy First',
    privacyDescription: 'Your images are processed to extract measurements and then deleted immediately. We never store your photos or face data.',
    learnMore: 'Learn More',
    continue: 'Continue',
  },
  home: {
    tagline: 'Find your best fit, instantly.',
    checkFrameTitle: 'Check a Specific Frame',
    checkFrameDescription: 'Upload photos of an empty frame to see if it fits you. Use a reference object for best results.',
    startAnalysis: 'Start Analysis',
    analyzeCurrentTitle: 'Analyze My Current Glasses',
    analyzeCurrentDescription: 'Take a selfie wearing your glasses to check their fit and get size recommendations.',
    analyzeMyFit: 'Analyze My Fit',
  },
  analyzeCurrent: {
    title: "Analyze Your Current Glasses",
    description: "Let's analyze the fit of the glasses you're wearing now.",
    requirement1: 'Two selfies wearing your glasses (one from the front, one from the side).',
  },
  checkFrame: {
      title: "Check a Specific Frame",
      description: "Let's check the fit. We'll guide you through a few simple steps.",
      requirement1: 'One selfie (without any glasses on).',
      requirement2: 'Two photos of the frame (one from the front, one from the side).',
      requirement3: 'A reference object like a credit card, coin, or A4 paper for best accuracy.',
  },
  privacy: {
    title: "Privacy Policy",
    section1: {
        title: "1. Introduction",
        content: "Welcome to FrameSense. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our web application."
    },
    section2: {
        title: "2. Information We Collect",
        intro: "We are a privacy-first service. We are designed to collect the minimum information necessary to provide our service:",
        item1: {
            title: "Images",
            content: "We require you to provide images (selfies, photos of frames) to perform our fit analysis. These images are used solely for the analysis and are deleted immediately after processing. We do not store your images."
        },
        item2: {
            title: "Analysis Results",
            content: "We store the anonymized text-based results of the analysis (e.g., measurements, fit verdict) for 30 days to allow you to access your report via a shareable link. After 30 days, this data is automatically deleted."
        },
        item3: {
            title: "Contact Information (Optional)",
            content: "If you choose to send your report via email or SMS, we collect your email address or phone number. This information is used only to send the report and is not stored long-term or used for marketing purposes."
        }
    },
    section3: {
        title: "3. How We Use Your Information",
        intro: "We use the information we collect strictly to:",
        item1: "Provide, operate, and maintain our service.",
        item2: "Perform the eyeglass fit analysis.",
        item3: "Generate and deliver your fit report if you request it.",
        item4: "Improve our service based on fully anonymized usage data and feedback."
    },
    section4: {
        title: "4. Data Deletion",
        content: "We take data deletion very seriously. All images you provide are deleted from our servers immediately after the analysis is complete. Anonymized text results are deleted after 30 days. We do not create user accounts, so there is no personal data to manage beyond the temporary analysis results."
    },
    section5: {
        title: "5. Contact Us",
        content: "If you have any questions about this Privacy Policy, please contact us at "
    }
  },
  terms: {
      title: "Terms of Service",
      section1: {
          title: "1. Acceptance of Terms",
          content: "By accessing or using FrameSense, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service."
      },
      section2: {
          title: "2. Description of Service",
          content: "FrameSense provides a web-based tool to help users analyze the fit of eyeglasses based on images. The service provides estimations and recommendations but is not a substitute for professional advice."
      },
      section3: {
          title: "3. Disclaimer of Medical Advice",
          important: "FrameSense is not a medical device and does not provide medical advice.",
          content: "The fit analysis, recommendations, and red-flag triage are for informational purposes only. Our service is not intended to diagnose any medical condition or replace a professional consultation with a qualified optometrist or ophthalmologist. Always consult a professional for any health concerns or before making decisions about your eyewear."
      },
      section4: {
          title: "4. User Conduct",
          content: "You agree not to use the service for any unlawful purpose or to upload any content that is offensive, harmful, or violates the rights of others. You are responsible for the images you upload and for ensuring you have the right to use them."
      },
      section5: {
          title: "5. Limitation of Liability",
          content: "FrameSense is provided 'as is,' and we make no warranties regarding its accuracy or reliability. In no event shall FrameSense be liable for any damages arising from the use of our service."
      },
      section6: {
          title: "6. Changes to Terms",
          content: "We reserve the right to modify these terms at any time. We will notify users of any changes by posting the new terms on this page."
      }
  },
  footer: {
      copyright: '© {{year}} FrameSense. All rights reserved. Not medical advice.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
  }
};

export default en;

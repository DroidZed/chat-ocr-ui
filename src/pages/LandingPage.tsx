import { Link } from 'react-router-dom';
import { MessageSquare, Image, Zap, Shield } from 'lucide-react';
import Footer from '../components/custom/Footer';
import grepsysLogo from '@/assets/logo.png';

export default function LandingPage() {
  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-20 px-5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-sm text-gray-600">Powered by</span>
            <img
              src={grepsysLogo}
              alt="GREPSYS"
              className="h-6"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Chat with Your Images
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Transform images into conversations. Extract text, analyze content, and interact with your documents using AI-powered OCR technology.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/chat"
              className="text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-all shadow-lg"
              style={{ backgroundColor: '#43b149' }}
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="bg-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg border-2"
              style={{ color: '#43b149', borderColor: '#43b149' }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<MessageSquare className="w-12 h-12" style={{ color: '#43b149' }} />}
              title="AI Chat Interface"
              description="Engage in natural conversations about your images and documents."
            />
            <FeatureCard
              icon={<Image className="w-12 h-12" style={{ color: '#43b149' }} />}
              title="OCR Technology"
              description="Extract text from images with high accuracy using advanced OCR."
            />
            <FeatureCard
              icon={<Zap className="w-12 h-12" style={{ color: '#43b149' }} />}
              title="Lightning Fast"
              description="Get instant responses and text extraction in seconds."
            />
            <FeatureCard
              icon={<Shield className="w-12 h-12" style={{ color: '#43b149' }} />}
              title="Secure & Private"
              description="Your data is processed securely with privacy as our priority."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Upload Your Image"
              description="Simply drag and drop or select an image containing text."
            />
            <StepCard
              number="2"
              title="AI Processes Content"
              description="Our AI analyzes and extracts text from your image instantly."
            />
            <StepCard
              number="3"
              title="Chat & Interact"
              description="Ask questions and get insights about your document content."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-5" style={{ backgroundColor: '#43b149' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-green-50 mb-8">
            Join thousands of users who are transforming how they interact with documents.
          </p>
          <Link
            to="/chat"
            className="bg-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg inline-block"
            style={{ color: '#43b149' }}
          >
            Start Chatting Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="text-center">
      <div className="text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg" style={{ backgroundColor: '#43b149' }}>
        {number}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

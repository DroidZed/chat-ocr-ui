import { Link } from 'react-router-dom';
import { Target, Users, Heart, Lightbulb } from 'lucide-react';
import Footer from '../components/custom/Footer';

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-green-50 to-emerald-100 py-20 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            We're on a mission to make document interaction seamless and intelligent through AI-powered technology.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe that extracting and understanding information from images should be effortless.
              Our platform combines cutting-edge OCR technology with conversational AI to create a
              seamless experience that transforms how people interact with visual content.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ValueCard
              icon={<Target className="w-10 h-10" style={{ color: '#43b149' }} />}
              title="Our Vision"
              description="To become the leading platform for AI-powered document understanding, making information accessible to everyone, everywhere."
            />
            <ValueCard
              icon={<Lightbulb className="w-10 h-10" style={{ color: '#43b149' }} />}
              title="Innovation"
              description="We constantly push the boundaries of what's possible with AI and OCR technology to deliver the best user experience."
            />
            <ValueCard
              icon={<Heart className="w-10 h-10" style={{ color: '#43b149' }} />}
              title="User-Centric"
              description="Every feature we build is designed with our users in mind, ensuring simplicity without compromising on power."
            />
            <ValueCard
              icon={<Users className="w-10 h-10" style={{ color: '#43b149' }} />}
              title="Community"
              description="We're building a community of users who believe in the power of AI to enhance productivity and understanding."
            />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Our Story
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg mb-6">
              Chat OCR was born from a simple observation: people spend countless hours manually
              transcribing text from images, screenshots, and scanned documents. We knew there had
              to be a better way.
            </p>
            <p className="text-gray-700 text-lg mb-6">
              Our team at GREPSYS came together with a vision to create a platform that not only
              extracts text from images but allows users to have meaningful conversations about the
              content. We wanted to go beyond simple OCR to create an intelligent assistant that
              understands context and can answer questions.
            </p>
            <p className="text-gray-700 text-lg mb-6">
              Today, Chat OCR serves users worldwide, helping them work smarter and faster.
              Whether you're a student digitizing notes, a professional processing receipts, or
              anyone dealing with visual content, we're here to make your life easier.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Powered by Advanced Technology
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TechCard
              title="AI & Machine Learning"
              description="State-of-the-art language models power our conversational interface, providing intelligent responses and insights."
            />
            <TechCard
              title="OCR Engine"
              description="Advanced optical character recognition technology ensures accurate text extraction from any image format."
            />
            <TechCard
              title="Cloud Infrastructure"
              description="Scalable, secure cloud architecture delivers fast processing and reliable performance."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-5" style={{ backgroundColor: '#43b149' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Experience the Future of Document Interaction
          </h2>
          <p className="text-xl text-green-50 mb-8">
            Join our community and see why thousands trust Chat OCR for their document needs.
          </p>
          <Link
            to="/chat"
            className="bg-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg inline-block"
            style={{ color: '#43b149' }}
          >
            Try Chat OCR Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-lg">{description}</p>
    </div>
  );
}

interface TechCardProps {
  title: string;
  description: string;
}

function TechCard({ title, description }: TechCardProps) {
  return (
    <div className="text-center p-6 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

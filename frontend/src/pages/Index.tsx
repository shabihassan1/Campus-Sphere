import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Welcome to Campus Sphere
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Your complete platform for student society engagement, event management, and campus feedback.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <FeatureCard 
            title="Join Societies" 
            description="Discover and join student societies that match your interests and passions."
            link="/societies"
          />
          <FeatureCard 
            title="Attend Events" 
            description="Stay updated on upcoming events and register to attend with just a click."
            link="/events"
          />
          <FeatureCard 
            title="Share Feedback" 
            description="Provide valuable feedback on societies and events to help improve campus life."
            link="/feedback"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-blue-800 mb-3">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button asChild variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
        <Link to={link}>Explore &rarr;</Link>
      </Button>
    </div>
  );
} 
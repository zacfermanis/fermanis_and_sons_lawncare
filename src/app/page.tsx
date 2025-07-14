import { Hero } from '../components/homepage/Hero'
import { ServiceOverview } from '../components/homepage/ServiceOverview'
import { ContactSection } from '../components/homepage/ContactSection'

export default function Home() {
  return (
    <div>
      <Hero />
      <ServiceOverview />
      <ContactSection />
    </div>
  )
}

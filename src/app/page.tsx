import Hero from '@/components/Hero'
import SocialProof from '@/components/SocialProof'
import OriginTeaser from '@/components/OriginTeaser'
import VaultGrid from '@/components/VaultGrid'
import ContactCTA from '@/components/ContactCTA'
import NewsletterForm from '@/components/NewsletterForm'

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <OriginTeaser />
      <VaultGrid />
      <ContactCTA />
      <section id="newsletter" className="py-24 px-6 border-t border-[#262626]">
        <div className="max-w-2xl mx-auto">
          <NewsletterForm />
        </div>
      </section>
    </>
  )
}

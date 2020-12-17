import { GetServerSideProps } from 'next'
import Link from 'next/link'
import SEO from '@/components/SEO'
import { client } from '@/lib/prismic'
import api from '../services/api'
import { Title } from '../styles/pages/Home'
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
import { Document } from 'prismic-javascript/types/documents'

interface HomeProps {
  recommendedProducts: Array<Document>
}

export default function Home({ recommendedProducts }: HomeProps) {

  /*   async function handleSum() {
      const { sum } = (await import('../lib/math')).default
  
      alert(sum(3, 5))
    } */
  return (
    <div >
      <SEO
        title="DevCommerce, your best e-commerce! "
        image="rocket-boost.png"
        shouldExcludeTitleSuffix
      />
      <section>
        <Title>Recommended Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => (
            <li key={recommendedProduct.id}>
              <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                <a>
                  {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])

  return {
    props: {
      recommendedProducts: recommendedProducts.results
    }
  }
} 
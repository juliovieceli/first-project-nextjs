import { GetServerSideProps } from 'next'
import api from '../services/api'
import { Title } from '../styles/pages/Home'

interface IProducts {
  id: string;
  title: string
}

interface HomeProps {
  recommendedProducts: Array<IProducts>
}

export default function Home({ recommendedProducts }: HomeProps) {

  async function handleSum() {
    const { sum } = (await import('../lib/math')).default

    alert(sum(3, 5))
  }
  return (
    <div >
      <section>
        <Title>Recommended Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => (
            <li key={recommendedProduct.id}>
              {recommendedProduct.title}
            </li>
          ))}
        </ul>
      </section>

      <button onClick={handleSum}>
        Sum
      </button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const { data } = await api.get('/recommended')

  const recommendedProducts = data

  return {
    props: {
      recommendedProducts
    }
  }
} 
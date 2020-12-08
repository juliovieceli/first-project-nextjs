import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import api from '../../../services/api'

interface IProducts {
   id: string;
   title: string
}

interface CategoryProps {
   products: Array<IProducts>
}

export default function Category({ products }: CategoryProps) {

   const router = useRouter()

   if (router.isFallback) {
      return <p>Carregando ...</p>
   }

   return (
      <div>
         <h1>{router.query.slug}</h1>

         <ul>
            {products.map(product => (
               <li key={product.id}>
                  {product.title}
               </li>
            ))}
         </ul>

      </div>

   )
}

export const getStaticPaths: GetStaticPaths = async () => {
   const { data } = await api.get(`/categories`)

   const categories = data

   const paths = categories.map(category => {
      return {
         params: {
            slug: category.id
         }
      }
   })

   return {
      paths,
      fallback: true
   }
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
   const { slug } = context.params;

   const { data } = await api.get(`/products?category_id=${slug}`)

   const products = data

   return {
      props: {
         products
      },
      revalidate: 60
   }
} 
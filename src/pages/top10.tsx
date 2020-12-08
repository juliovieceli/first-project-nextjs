import { GetStaticProps } from "next"
import api from "../services/api"

interface IProducts {
   id: string;
   title: string
}

interface Top10Props {
   products: Array<IProducts>
}

export default function Top10({ products }: Top10Props) {
   return (
      <div>
         <h1>Top 10 </h1>
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


export const getStaticProps: GetStaticProps<Top10Props> = async (context) => {
   const { data } = await api.get('/products')

   const products = data

   return {
      props: {
         products
      },
      revalidate: 5
   }
} 
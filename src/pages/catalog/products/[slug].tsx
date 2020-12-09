import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useState } from 'react'
//import AddToCartModal from '../../../components/AddToCartModal'

const AddToCartModal = dynamic(
   () => import('@/components/AddToCartModal'),
   { loading: () => <p>Carregando...</p>, ssr: false }

)

export default function Search() {
   const router = useRouter()
   const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false)

   function handleAddToCart() {
      console.log(process.env.NEXT_PUBLIC_API_URL)
      setIsAddToCartModalVisible(true)
   }

   return (
      <div>
         <h1>{router.query.slug}</h1>

         <button onClick={handleAddToCart}>Add to cart</button>

         {isAddToCartModalVisible && <AddToCartModal />}
      </div>

   )
}
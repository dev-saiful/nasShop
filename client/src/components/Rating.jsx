import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";

export default function Rating({stars, reviews, rate}) {
    const ratingStar = Array.from({length: 5}, (element, index) => {
        let number = index + 0.1;

        return <span key={index} className=" text-yellow-200">
            {
                stars >= index + 1 ? (
                    <IoIosStar></IoIosStar>
                ) : stars >= number ? (
                    <IoIosStarHalf></IoIosStarHalf>
                ) : (<IoIosStarOutline></IoIosStarOutline>)
            }
        </span>
    })
  return (
<div className="flex items-center">
    {ratingStar}
    {
        rate === 'rate' ? (
            <p className="ml-3">
                {stars === 1 ? 'Poor' : 
                 stars === 2 ? 'Fair' : 
                 stars === 3 ? 'Good' : 
                 stars === 4 ? 'Very Good' : 
                 stars === 5 ? 'Excellent' : ''} 
            </p>
        ) : (
            <p className="ml-3">{reviews} reviews</p>
        )
    }
</div>
  )
}

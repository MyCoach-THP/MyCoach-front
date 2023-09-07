import { useState, useEffect } from "react";

const ShoppingCart = () => {
  const [myCard, setMyCard] = useState(["test", "haha", "blabla"]);

  const handleDeleteArticle = (indexArticle) => {
    const updatedCard = [...myCard];
    updatedCard.splice(indexArticle, 1);

    setMyCard(updatedCard);
  };

  return (
    <>
      <div className='background-style'>
        <div className='flex justify-center items-center min-h-screen opacity-90'>
          <div className='bg-white p-8 rounded shadow-md mt-[-400px]'>
            <h1 className='text-2xl mb-4 text-center'>Mon panier</h1>
            {myCard.length != 0 ? (
              <>
                <p className='text-xl mb-4 text-center'>
                  Vous avez {myCard.length} article(s) dans votre panier
                </p>
                <ul>
                  {myCard.map((item, index) => (
                    <li
                      className='flex justify-between items-center m-2'
                      key={index}>
                      {item}
                      <button
                        className='justify-end bg-red-500 hover:bg-red-700 text-white font-bold py-0.5 px-4 rounded'
                        onClick={() => handleDeleteArticle(index)}>
                        Supprimer l'article
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              "Votre panier est vide"
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;

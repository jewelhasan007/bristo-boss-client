
const Cart = ({ image }) => {
 
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl m-3">
        <figure>
          <img width="150px" height="150px" src={image} alt="Caeser Salad" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

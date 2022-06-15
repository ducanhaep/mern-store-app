import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct } from "../api/productApi";
import useMutation from "../hooks/useMutation";
import LazyLoadImg from "./LazyLoadImg";
import Modal from "./Modal";
import ProductForm from "./ProductForm";
const ProductsCard = ({ product }) => {
  const [openProduct, setOpenProduct] = useState(false);
  const { mutate, loading } = useMutation();

  const handleDeleteProduct = (id) => {
    if (window.confirm("Do you want to delete this item?")) {
      mutate(() => deleteProduct(id));
    }
  };

  return (
    <div className="card">
      <LazyLoadImg url={product.image} />

      <div className="box">
        <h3>
          <Link to={`/products/${product._id}`}>
            <span />
            {product.title}
          </Link>
        </h3>
        <h4>${product.price}</h4>

        <div className="btn_div">
          <button className="btn_edit" onClick={() => setOpenProduct(true)}>
            Edit
          </button>
          <button
            className="btn_delete"
            onClick={() => handleDeleteProduct(product._id)}
            disabled={loading}
          >
            {loading ? "Loading" : "Delete"}
          </button>
        </div>
      </div>

      <div>
        {openProduct && (
          <Modal titleTxt="Update Product" setOpen={setOpenProduct}>
            <ProductForm btnTxt="Update" data={product} />
          </Modal>
        )}
      </div>
    </div>
  );
};
export default ProductsCard;

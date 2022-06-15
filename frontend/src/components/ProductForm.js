import { useRef } from "react";
import { createProduct, updateProduct } from "../api/productApi";
import useMutation from "../hooks/useMutation";
const ProductForm = ({ btnTxt, data }) => {
  const formRef = useRef();
  const { mutate, loading } = useMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const children = formRef.current.children;
    // let newData = {};
    // [...children].forEach((child) => {
    //   if (child.name) {
    //     newData = { ...newData, [child.name]: child.value };
    //     console.log(newData);
    //   }
    // });
    const newData = [...children].reduce((obj, child) => {
      if (!child.name) return obj;
      return { ...obj, [child.name]: child.value };
    }, {});

    function shallowCompare(obj1, obj2) {
      const keys = Object.keys(obj1);
      for (let key of keys) {
        if (obj1[key] !== obj2[key]) {
          return false;
        }
        return true;
      }
    }

    if (data) {
      shallowCompare(newData, data);
      const noChange = shallowCompare(newData, data);
      if (noChange) return;
      // axios
      //   .put(`products/${data._id}`, newData)
      //   .then((res) => console.log(res.data));
      // updateProduct({ id: data._id, newData }).then((res) =>
      //   console.log(res.data)
      // );
      mutate(() => updateProduct({ id: data._id, newData }));
    } else {
      // axios.post(`products`, newData).then((res) => console.log(res.data));
      // createProduct(newData).then((res) => console.log(res.data));
      mutate(() => createProduct(newData));
    }
  };
  return (
    <div className="product_form">
      <form onSubmit={handleSubmit} ref={formRef}>
        <input
          type="text"
          placeholder="Product title"
          required
          name="title"
          defaultValue={data?.title}
        />
        <input
          type="text"
          placeholder="Product description"
          required
          name="description"
          defaultValue={data?.description}
        />
        <input
          type="text"
          placeholder="Product price"
          required
          name="price"
          defaultValue={data?.price}
        />
        <input
          type="text"
          placeholder="Product category"
          required
          name="category"
          defaultValue={data?.category}
        />
        <input
          type="text"
          placeholder="Product image"
          required
          name="image"
          defaultValue={data?.image}
        />

        <button disabled={loading}>{loading ? "Loading..." : btnTxt}</button>
      </form>
    </div>
  );
};
export default ProductForm;

import AddProductForm from "@/app/products/AddProductForm";

export default function CreateProductPage() {
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h1 className="text-xl font-bold mb-6">Add New Product</h1>

      <AddProductForm />
    </div>
  );
}

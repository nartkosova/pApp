import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import competitorServices from "../../../services/competitorServices";
import { CreateUpdateForm } from "../../../components/CreateBaseForm/CreateUpdateBaseForm";
import { AxiosError } from "axios";

const UpdateCompetitorBrand = () => {
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<Record<string, string>>(
    {}
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const brand = await competitorServices.getCompetitorBrandById(
          Number(id)
        );
        setInitialValues({ brand_name: brand.brand_name });
      } catch (err) {
        console.error("Failed to load brand", err);
        const axiosError = err as AxiosError<{ error: string }>;
        const backendMessage =
          axiosError.response?.data?.error ||
          "Gabim gjatë ngarkimit të dhenave.";
        alert(backendMessage);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBrand();
  }, [id]);

  const handleUpdate = async (data: Record<string, string | number>) => {
    if (!id) return;
    try {
      await competitorServices.updateCompetitorBrand(Number(id), {
        brand_name: data.brand_name as string,
      });
      alert("Konkurrenca u përditësua me sukses.");
    } catch (err) {
      console.error("Error updating brand", err);
      const axiosError = err as AxiosError<{ error: string }>;
      const backendMessage =
        axiosError.response?.data?.error || "Gabim gjatë përditësimit.";
      alert(backendMessage);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      {loading ? (
        <p>Duke u ngarkuar...</p>
      ) : (
        <CreateUpdateForm
          title="Përditëso Konkurrencën"
          fields={[{ name: "brand_name", label: "Emri i konkurrencës" }]}
          initialValues={initialValues}
          onSubmit={handleUpdate}
          submitText="Vazhdo"
        />
      )}
    </div>
  );
};

export default UpdateCompetitorBrand;

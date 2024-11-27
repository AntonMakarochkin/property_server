import axios from 'axios';
import { Filter } from '../../Models/residences/types'; 
import { fetchResidencesAdapter } from '../../Adapters/fetchResidencesAdapter';

export async function fetchResidences(filters: Filter): Promise<any[]> {
  const response = await axios.get(
    `http://localhost:3000/residences/get_all`, {params: filters}
  );
  const { data } = response;
  return fetchResidencesAdapter(data);
}

export async function fetchResidencesHandbook(): Promise<any[]> {
  const response = await axios.get(
    `http://localhost:3000/residences/handbook`
  );
  const { data } = response;
  return data;
}

export async function fetchAddResidence(params: any) {
	const { name, description, categories, gallery, priceFrom, area, remoteness, type} = params;
	const formData = new FormData();
	Object.values(gallery).map((photo: any) => formData.append('gallery[]', photo));
	categories.map((item: any) => {
		formData.append('categoriesPhotos[]', item.picture[0])
		formData.append('categoriesNames[]', item.name)
		formData.append('categoriesDescriptions[]', item.description)
	});
	formData.append('description', description);
	formData.append('name', name);
	formData.append('priceFrom', priceFrom);
	formData.append('area', area);
	formData.append('remoteness', remoteness);
	formData.append('type', type);

	const response = axios.post('http://localhost:3000/add_residence', formData);
	return response;
}

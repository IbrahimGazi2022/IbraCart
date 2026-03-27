import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Search, X, Plus } from 'lucide-react';
import { API_URL } from '../../../config/apiConfig';
import { setProducts, setLoading, setError } from '../../../store/productSlice';
import Modal from '../../reusableComp/Modal';

const TopSelling = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state: RootState) => state.products);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) && !selected.includes(p.id)
    );

    const selectedProducts = products.filter(p => selected.includes(p.id));

    const add = (id: number) => setSelected(prev => [...prev, id]);
    const remove = (id: number) => setSelected(prev => prev.filter(i => i !== id));

    const fetchProducts = async () => {
        try {
            dispatch(setLoading(true));
            const response = await fetch(`${API_URL}/api/products/getAllProduct`);
            const data = await response.json();
            dispatch(setProducts(data.data));
            dispatch(setLoading(false));
        } catch (error) {
            console.error('Get product error:', error);
            dispatch(setError('Failed to fetch products' || error));
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, []);

    const handleSave = async () => {
        try {
            await Promise.all(
                products.map(p =>
                    fetch(`${API_URL}/api/products/${p.id}/toggle-featured`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ isFeatured: selected.includes(p.id) })
                    })
                )
            );
            setIsModalOpen(true);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (products.length > 0) {
            setSelected(products.filter(p => p.isFeatured).map(p => p.id));
        }
    }, [products]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-black text-gray-900">Top Selling</h1>
                <p className="text-gray-500 mt-1">Select products to feature</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* LEFT */}
                <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">All Products</p>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="bg-transparent outline-none text-sm w-full"
                        />
                    </div>
                    <div className="space-y-2 max-h-125px overflow-y-auto">
                        {filtered.map(p => (
                            <div key={p.id} className="flex items-center gap-3 p-2 border border-gray-100 rounded-lg">
                                <img src={p.imageUrl} className="w-10 h-10 object-contain rounded-lg bg-gray-50" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                                    <p className="text-xs text-gray-500">{p.category}</p>
                                </div>
                                <button onClick={() => add(p.id)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Top Selling</p>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">{selected.length} selected</span>
                    </div>
                    <div className="space-y-2 max-h-125px overflow-y-auto">
                        {selectedProducts.map(p => (
                            <div key={p.id} className="flex items-center gap-3 p-2 border border-green-100 rounded-lg">
                                <img src={p.imageUrl} className="w-10 h-10 object-contain rounded-lg bg-gray-50" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                                    <p className="text-xs text-gray-500">{p.category}</p>
                                </div>
                                <button onClick={() => remove(p.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        {selected.length === 0 && <p className="text-sm text-gray-400 text-center py-8">No products selected</p>}
                    </div>
                    <button
                        onClick={handleSave}
                        className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
            {/* --- MODAL --- */}
            <Modal
                isOpen={isModalOpen}
                message="Featured Products Saved successfully"
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default TopSelling;
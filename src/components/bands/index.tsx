'use client'
import AddBand from "@/components/bands/add";
import BandsTable from "@/components/bands/table";
import { Card, CardContent } from "@/components/ui/card";
import { useBands } from "@/hooks/useBands";
import api from "@/lib/api";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BandsPage() {
    const { bands, setBands } = useBands();
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchBandsData = async () => {
            try {
                const response = await api.get("/bands");
                setBands(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchBandsData();
    }, [setBands]);

    return (
        <Card className="w-full p-10">
            <CardContent className="space-y-8">
                <div className="flex items-center justify-between gap-4">
                    <Image src="/logo-gig.png" alt="Logo" width={80} height={80} />
                    <input
                        type='text'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Pesquisar banda'
                        className='flex-1 border border-gray-300 rounded-md p-2' />
                    <AddBand />
                </div>
                <BandsTable data={bands.filter((band) => {
                    return search.toLowerCase() === '' ? band : 
                    band.name.toLowerCase().includes(search.toLowerCase());
                })} />
            </CardContent>
        </Card>
    );
}

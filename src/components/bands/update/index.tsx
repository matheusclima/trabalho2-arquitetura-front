import { Edit2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Input } from "../../ui/input";
import api from "@/lib/api";
import { useState } from "react";
import { useBands } from "@/hooks/useBands";
import httpResponses from "@/constants/httpResponses";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function UpdateBand({ id }: { id: number }) {
    const [openDialog, setOpenDialog] = useState(false);
    const { setBands } = useBands();

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const payload = Object.fromEntries(formData.entries());
        try {
            const response = await api.put(`/bands/${id}`, payload);
            if (response.status === httpResponses.OK) {
                setBands((prevBands) => prevBands.map((band) => {
                    if (band.id === id) {
                        return response.data;
                    }
                    return band;
                }));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setOpenDialog(false);
        }
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <Edit2 size={20} className="text-blue-700" />
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[680px]">
                <DialogHeader>
                    <DialogTitle>
                        Editar banda
                    </DialogTitle>
                    <DialogDescription>
                        Altere as informações da banda selecionada.
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={(e) => handleUpdate(e)}>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-left text-sm">
                            Nome
                        </label>
                        <Input
                            id="name"
                            name="name"
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="genre" className="text-left text-sm">
                            Gênero
                        </label>
                        <Input
                            id="genre"
                            name="genre"
                            className="col-span-3"
                            required
                        />
                        <label htmlFor="formationYear" className="text- text-sm">
                            Ano de formação
                        </label>
                        <Input
                            id="formationYear"
                            name="formationYear"
                            type="number"
                            defaultValue={1950}
                            min={1950}
                            className="col-span-3"
                        />
                    </div>
                    <DialogFooter>
                        <button type="submit" className={cn(
                            'hover:bg-blue-700 transition-colors duration-200 ease-in-out',
                            "bg-blue-600 text-white font-semibold px-8 py-2 rounded-xl"
                        )}>
                            Editar
                        </button>
                        <button
                            type="button"
                            onClick={() => setOpenDialog(false)}
                            className="border-red-500 border-2 px-4 py-2 rounded-xl text-red-500 font-semibold">
                            Cancelar
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    )
}
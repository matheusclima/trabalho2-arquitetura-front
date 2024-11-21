import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Input } from "../../ui/input";
import api from "@/lib/api";
import { useState } from "react";
import { useBands } from "@/hooks/useBands";
import httpResponses from "@/constants/httpResponses";
import { cn } from "@/lib/utils";

export default function AddBand() {
    const [openDialog, setOpenDialog] = useState(false);
    const { setBands } = useBands();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const payload = Object.fromEntries(formData.entries());
        try {
            const response = await api.post("/bands", payload);
            if (response.status === httpResponses.CREATED) {
                setBands((prevBands) => [...prevBands, response.data]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setOpenDialog(false);
        }
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger>
                <div className={cn(
                    'hover:bg-blue-600 transition-colors duration-200 ease-in-out font-semibold',
                    "flex items-center bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                )}>
                    <Plus size={20} />
                    Adicionar banda
                </div>
            </DialogTrigger>
            <DialogContent className="min-w-[680px]">
                <DialogHeader>
                    <DialogTitle>
                        Nova banda
                    </DialogTitle>
                    <DialogDescription>
                        Adicione uma nova banda ao sistema
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={(e) => handleSubmit(e)}>
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
                        <button type="submit"
                            className={cn(
                                'hover:bg-green-700 transition-colors duration-200 ease-in-out',
                                "bg-green-600 text-white px-4 py-2 rounded-xl font-semibold"
                            )}>
                            Adicionar
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
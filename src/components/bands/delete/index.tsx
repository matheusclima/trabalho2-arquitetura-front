import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useBands } from "@/hooks/useBands";
import api from "@/lib/api";
import { Trash2 } from "lucide-react";

export default function DeleteBand({ id }: { id: number }) {
    const { setBands } = useBands();

    const handleDelete = async () => {
        try {
            setBands((prevBands) => prevBands.filter((band) => band.id !== id));
            await api.delete(`/bands/${id}`);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost">
                    <Trash2 size={20} className="text-red-500" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deseja realmente apagar essa entrada?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não poderá ser desfeita. O registro da banda será apagado permanentemente.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors duration-200 ease-in-out"
                        onClick={() => handleDelete()}
                    >Apagar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
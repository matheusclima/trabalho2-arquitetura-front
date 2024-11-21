import { Band } from "@/types/types";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import DeleteBand from "../delete";
import UpdateBand from "../update";

interface IBandsTable {
    data: Band[]
}

export default function BandsTable({ data }: IBandsTable) {
    const headers = ['ID', 'Nome', 'Genêro', 'Ano de formação']

    return (
        <Table>
            <TableCaption>
                Bandas cadastradas
            </TableCaption>
            <TableHeader>
                <TableRow>
                    {headers.map((header) => (
                        <TableHead key={header}>
                            {header}
                        </TableHead>
                    ))}
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.sort((a, b) => a.id - b.id).map((band, index) => (
                    <TableRow key={band.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{band.name}</TableCell>
                        <TableCell>{band.genre}</TableCell>
                        <TableCell>{band.formationYear}</TableCell>
                        <TableCell className="flex items-center">
                            <UpdateBand id={band.id}/>
                            <DeleteBand id={band.id}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )

}
import QRCode from "react-qr-code";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


interface QrCodeCardProps {
  data: {
    brCode: string;
    customerEmail: string;
    customerName: string;
    customerTaxID: string;
  }
}


export default function QrCodeCard({ data }: QrCodeCardProps) {
  const handleCopy = async () => {
    // TODO - copy to clipboard
    await navigator.clipboard.writeText(data.brCode)
    toast.success('Copiado com sucesso!')
  }
  return (
    <Card className="mt-20 xl:mt-0 text-center">
      <CardHeader>
        <CardTitle className="mt-5">Realize o pagamento para receber seu produto!</CardTitle>
        <CardDescription className="p-10">Abra o app do seu banco, escaneie a imagem ou cole o código QR Code</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <QRCode
          size={256}
          value={data.brCode}
          viewBox="0 0 256 256"
        />
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="bg-emerald-300 xl:mt-10" onClick={handleCopy}>Copiar Código Qr Code</Button>
      </CardFooter>
    </Card>
  )
}
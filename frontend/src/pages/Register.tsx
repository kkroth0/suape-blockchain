import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Truck, Shield, CheckCircle, Camera, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { postEvent } from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    placa: "",
    tipo: "",
    local: "",
    operador: "Operador Manual",
    observacoes: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.placa || !formData.tipo || !formData.local) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha placa, tipo e local.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await postEvent({ placa: formData.placa, tipo: formData.tipo, local: formData.local });
      toast({
        title: "Evento registrado!",
        description: `Caminhão ${formData.placa} registrado e enviado para blockchain.`,
      });
      navigate("/dashboard");
    } catch (err) {
      toast({
        title: "Erro ao registrar evento",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const locaisPorto = [
    "Portão Principal", "Pátio A - Triagem", "Pátio B - Granéis", 
    "Terminal 1 - Contêineres", "Terminal 2 - Carga Geral", "Terminal 3 - Contêineres",
    "Portão de Saída Norte", "Portão de Saída Sul"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Registro Manual - Porto de Suape</h1>
              <p className="text-muted-foreground">Sistema de Monitoramento</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border border-warning/20 bg-warning/5 mb-6">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                <div>
                  <h4 className="font-medium text-warning">Registro Manual</h4>
                  <p className="text-sm text-muted-foreground">
                    Use apenas quando sistemas automáticos (OCR/TAG) não funcionarem.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-6 h-6 text-primary" />
                Evento de Movimentação
              </CardTitle>
              <CardDescription>
                Registre entrada/saída de caminhão no Porto de Suape
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label>Placa do Caminhão *</Label>
                  <Input
                    placeholder="ABC-1234"
                    value={formData.placa}
                    onChange={(e) => setFormData(prev => ({ ...prev, placa: e.target.value.toUpperCase() }))}
                    className="font-mono text-lg"
                    maxLength={8}
                    required
                  />
                </div>

                <div>
                  <Label>Tipo de Movimento *</Label>
                  <Select value={formData.tipo} onValueChange={(value) => setFormData(prev => ({ ...prev, tipo: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o movimento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entrada">Entrada</SelectItem>
                      <SelectItem value="saida">Saída</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Local no Porto *</Label>
                  <Select value={formData.local} onValueChange={(value) => setFormData(prev => ({ ...prev, local: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o local" />
                    </SelectTrigger>
                    <SelectContent>
                      {locaisPorto.map((local) => (
                        <SelectItem key={local} value={local}>{local}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Observações</Label>
                  <Textarea
                    placeholder="Motivo do registro manual, problemas identificados..."
                    value={formData.observacoes}
                    onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-primary">Garantia de Integridade</h4>
                      <p className="text-sm text-muted-foreground">
                        Evento registrado com hash SHA256 e armazenado na blockchain para auditabilidade.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => navigate("/dashboard")} className="flex-1">
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Registrando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Registrar Evento
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
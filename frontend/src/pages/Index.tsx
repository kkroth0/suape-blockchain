import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield, Truck, Camera, Activity, MapPin, Clock, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Caminhões Ativos", value: "156", icon: Truck },
    { label: "Eventos Hoje", value: "2.847", icon: Activity },
    { label: "Pátios Monitorados", value: "12", icon: MapPin },
    { label: "Tempo Médio", value: "3.2h", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-xl">Porto de Suape</h1>
              <p className="text-sm text-muted-foreground">Sistema de Monitoramento</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-success/10 text-success px-3 py-2 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            Sistema Ativo
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Monitoramento Blockchain
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            Monitoramento Inteligente de Caminhões
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Rastreamento automatizado e confiável da circulação de caminhões no Porto de Suape com verificação blockchain para garantir integridade e transparência operacional.
          </p>
          <Button 
            onClick={() => navigate("/dashboard")}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary/80 hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <Eye className="w-5 h-5 mr-2" />
            Monitorar em Tempo Real
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
              <CardContent className="p-6 text-center">
                <stat.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80 hover:shadow-xl transition-all duration-200">
            <CardHeader>
              <Camera className="w-10 h-10 text-primary mb-4" />
              <CardTitle>Identificação Automática</CardTitle>
              <CardDescription>
                Sistema OCR e TAGs para identificação automatizada de caminhões em tempo real, eliminando registros manuais e fraudes.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80 hover:shadow-xl transition-all duration-200">
            <CardHeader>
              <Shield className="w-10 h-10 text-primary mb-4" />
              <CardTitle>Verificação Blockchain</CardTitle>
              <CardDescription>
                Registro imutável de eventos na blockchain para garantir autenticidade e possibilitar auditoria transparente dos dados.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80 hover:shadow-xl transition-all duration-200">
            <CardHeader>
              <Activity className="w-10 h-10 text-primary mb-4" />
              <CardTitle>Ciclo Logístico Fechado</CardTitle>
              <CardDescription>
                Controle completo de entrada e saída dos pátios, terminais e do Porto, com cálculo automático de tempos de permanência.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Problem Statement */}
        <Card className="border border-warning/20 bg-gradient-to-r from-warning/5 to-warning/10 mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Desafio Atual do Porto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-destructive">❌ Problemas Identificados:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Saída do Porto não registrada automaticamente</li>
                  <li>• Informações manuais com baixa confiabilidade</li>
                  <li>• Fraudes em registros de triagem</li>
                  <li>• Falta de visibilidade completa do fluxo</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-success">✅ Nossa Solução:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Registro automatizado com OCR e TAGs</li>
                  <li>• Dados imutáveis em blockchain</li>
                  <li>• Ciclo logístico completo e auditável</li>
                  <li>• Transparência total para stakeholders</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Transforme a Logística do seu Porto</h2>
            <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
              Monitore em tempo real todos os caminhões, elimine fraudes e ganhe visibilidade completa das operações logísticas.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate("/dashboard")}
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80"
              >
                <Activity className="w-5 h-5 mr-2" />
                Monitoramento em Tempo Real
              </Button>
              <Button 
                onClick={() => navigate("/register")}
                variant="outline"
                size="lg"
              >
                <Camera className="w-5 h-5 mr-2" />
                Registrar Evento Manual
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;

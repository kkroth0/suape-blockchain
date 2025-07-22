import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Activity, Calendar, MapPin, Shield, Search, Filter, Truck, Clock, CheckCircle, Camera, Eye, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getEvents } from '../services/api';

interface TruckEvent {
  id: string;
  placa: string;
  data: string;
  tipo: "entrada" | "saida";
  local: string;
  operador: string;
  hash: string;
  verificado: boolean;
  tempoEspera: string;
  status: "ativo" | "finalizado";
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<TruckEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<TruckEvent[]>([]);
  const [filterType, setFilterType] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [localFilter, setLocalFilter] = useState<string>("todos");

  // Mock data - eventos de caminhões no Porto de Suape
  const mockEvents: TruckEvent[] = [
    {
      id: "1",
      placa: "ABC-1234",
      data: "2024-01-22T14:30:00Z",
      tipo: "entrada",
      local: "Pátio A - Triagem",
      operador: "Sistema OCR Pegasus",
      hash: "0x4f3d2a1b9c8e7f6a5d4c3b2a1e0f9d8c7b6a5e4d3c2b1a0f",
      verificado: true,
      tempoEspera: "15 min",
      status: "ativo"
    },
    {
      id: "2",
      placa: "XYZ-5678",
      data: "2024-01-22T15:45:00Z",
      tipo: "saida",
      local: "Terminal 3 - Contêineres",
      operador: "TAG Automática",
      hash: "0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f",
      verificado: true,
      tempoEspera: "2.3h",
      status: "finalizado"
    },
    {
      id: "3",
      placa: "DEF-9012",
      data: "2024-01-22T16:20:00Z",
      tipo: "entrada",
      local: "Portão Principal",
      operador: "Câmera OCR P1",
      hash: "0x7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f",
      verificado: true,
      tempoEspera: "3 min",
      status: "ativo"
    },
    {
      id: "4",
      placa: "GHI-3456",
      data: "2024-01-22T17:10:00Z",
      tipo: "entrada",
      local: "Pátio B - Granéis",
      operador: "Sistema OCR Pegasus",
      hash: "0x2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b",
      verificado: true,
      tempoEspera: "8 min",
      status: "ativo"
    },
    {
      id: "5",
      placa: "JKL-7890",
      data: "2024-01-22T18:30:00Z",
      tipo: "saida",
      local: "Portão de Saída Sul",
      operador: "TAG + Câmera",
      hash: "0x5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a",
      verificado: true,
      tempoEspera: "4.7h",
      status: "finalizado"
    }
  ];

  useEffect(() => {
    // Buscar eventos reais do backend
    getEvents()
      .then(setEvents)
      .catch(() => setEvents([]));
  }, []);

  useEffect(() => {
    let filtered = events;

    // Filtro por tipo de movimento
    if (filterType !== "todos") {
      filtered = filtered.filter(event => event.tipo === filterType);
    }

    // Filtro por placa/local
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.local.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por área do porto
    if (localFilter !== "todos") {
      filtered = filtered.filter(event => event.local.includes(localFilter));
    }

    setFilteredEvents(filtered);
  }, [events, filterType, searchTerm, localFilter]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTipoColor = (tipo: string) => {
    return tipo === 'entrada' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning';
  };

  const getStatusColor = (status: string) => {
    return status === 'ativo' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground';
  };

  const locaisPorto = ["Pátio", "Terminal", "Portão"];
  const caminhaoesAtivos = events.filter(e => e.status === 'ativo').length;
  const eventosHoje = events.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header do Porto de Suape */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-xl">Porto de Suape - Monitoramento</h1>
                <p className="text-sm text-muted-foreground">Sistema de Rastreamento Inteligente</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-success/10 text-success px-3 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                Sistema Ativo
              </div>
              <Button 
                onClick={() => navigate("/register")}
                className="bg-gradient-to-r from-primary to-primary/80"
              >
                <Camera className="w-4 h-4 mr-2" />
                Registro Manual
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Activity className="w-10 h-10 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{caminhaoesAtivos}</div>
                  <div className="text-sm text-muted-foreground">Caminhões Ativos</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="w-10 h-10 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{eventosHoje}</div>
                  <div className="text-sm text-muted-foreground">Eventos Hoje</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-10 h-10 text-primary" />
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-muted-foreground">Pontos Monitorados</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-10 h-10 text-success" />
                <div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-muted-foreground">Taxa de Verificação</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-8 shadow-sm border-0 bg-gradient-to-r from-card to-card/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros de Monitoramento
            </CardTitle>
            <CardDescription>
              Filtre eventos por placa, tipo de movimento, área do porto ou período
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Buscar</label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="Placa ou local..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Movimento</label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de movimento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os movimentos</SelectItem>
                    <SelectItem value="entrada">Entradas</SelectItem>
                    <SelectItem value="saida">Saídas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Área do Porto</label>
                <Select value={localFilter} onValueChange={setLocalFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Área" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas as áreas</SelectItem>
                    {locaisPorto.map(local => (
                      <SelectItem key={local} value={local}>{local}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Resultados</label>
                <div className="flex items-center h-10 px-3 bg-muted rounded-md">
                  <span className="text-sm text-muted-foreground">
                    {filteredEvents.length} evento(s)
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Eventos */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Eventos Recentes ({filteredEvents.length})</h2>
          
          {filteredEvents.map((event) => (
            <Card 
              key={event.id} 
              className="border-0 shadow-lg bg-gradient-to-r from-card to-card/80 hover:shadow-xl transition-all duration-200"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                      <Truck className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{event.placa}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {event.local}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Camera className="w-4 h-4" />
                        {event.operador}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {formatDate(event.data)}
                    </div>
                    <Badge className={getTipoColor(event.tipo)}>
                      {event.tipo.charAt(0).toUpperCase() + event.tipo.slice(1)}
                    </Badge>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status === 'ativo' ? 'No Porto' : 'Finalizado'}
                    </Badge>
                    <div className="flex items-center gap-2 bg-success/10 text-success px-3 py-1 rounded-full text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Verificado Blockchain
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Tempo no Porto: </span>
                      <span className="font-medium text-primary">{event.tempoEspera}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Hash Blockchain: </span>
                      <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                        {event.hash.slice(0, 20)}...
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredEvents.length === 0 && (
            <Card className="border-0 bg-gradient-to-r from-card to-card/80">
              <CardContent className="p-12 text-center">
                <div className="text-muted-foreground">
                  <Truck className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Nenhum evento encontrado</p>
                  <p>Tente ajustar os filtros ou aguarde novos eventos do sistema de monitoramento</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
# Buscador de Pagos - Next.js + Supabase

Una aplicación web ultra simple para buscar pagos por payment_id usando Next.js, TypeScript y Supabase.

## Características

- ✅ Búsqueda de pagos por payment_id (sin autenticación)
- ✅ Interfaz limpia y responsive
- ✅ Manejo de errores y estados de carga
- ✅ TypeScript para type safety
- ✅ Ultra simple - solo busca pagos

## Configuración

### 1. Configurar Supabase

1. Ve a tu proyecto de Supabase
2. Copia tu URL y ANON_KEY desde: Settings > API
3. Actualiza el archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://gykwnvbzkadorxifnglp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

### 2. Configurar tabla de tickets

Asegúrate de que tu tabla `tickets` tenga esta estructura (como en tu ejemplo):

```sql
create table tickets (
  idx serial primary key,
  id integer not null,
  event_id integer not null,
  buyer_name text not null,
  buyer_email text not null,
  amount_paid text not null,
  payment_status text not null,
  payment_id text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  quantity integer not null
);

-- Asegúrate de que la tabla sea pública (sin autenticación requerida)
alter table tickets enable row level security;
create policy "Permitir lectura pública" on tickets for select using (true);
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3004`

## Uso

1. Ingresa el ID de un pago (payment_id) en el campo de búsqueda
2. Si el pago existe, verás todos sus detalles (nombre, email, monto, estado, etc.)
3. Si no existe, verás un mensaje de "Pago no encontrado - ID de pago inválido"

## Ejemplo de búsqueda

Puedes probar con este payment_id: `134673677430`

## Estructura del proyecto

```
ticket-app/
├── src/
│   ├── app/
│   │   └── page.tsx            # Página principal (única página)
│   ├── lib/
│   │   └── supabase.ts         # Cliente de Supabase
│   └── types/
│       └── supabase.ts         # Tipos TypeScript
└── .env.local                  # Variables de entorno
```

## Notas importantes

- Esta versión **no requiere autenticación** - cualquiera puede buscar pagos
- Asegúrate de que tu tabla `payments` tenga permisos de lectura públicos
- La aplicación es ultra simple: solo busca pagos por payment_id y muestra los resultados

## Despliegue

Para desplegar a producción:

1. Configura las variables de entorno en tu plataforma de despliegue
2. Ejecuta: `npm run build` y despliega

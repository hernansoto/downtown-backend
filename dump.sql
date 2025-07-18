--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Debian 15.13-1.pgdg120+1)
-- Dumped by pg_dump version 15.13 (Debian 15.13-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: downtown
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'CLIENT'
);


ALTER TYPE public."Role" OWNER TO downtown;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Event; Type: TABLE; Schema: public; Owner: downtown
--

CREATE TABLE public."Event" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "imageUrl" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    type text NOT NULL
);


ALTER TABLE public."Event" OWNER TO downtown;

--
-- Name: Payment; Type: TABLE; Schema: public; Owner: downtown
--

CREATE TABLE public."Payment" (
    id text NOT NULL,
    status text NOT NULL,
    amount double precision NOT NULL,
    "transactionId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "reservationId" text NOT NULL
);


ALTER TABLE public."Payment" OWNER TO downtown;

--
-- Name: Reservation; Type: TABLE; Schema: public; Owner: downtown
--

CREATE TABLE public."Reservation" (
    id text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "time" text NOT NULL,
    status text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Reservation" OWNER TO downtown;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: downtown
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO downtown;

--
-- Name: users; Type: TABLE; Schema: public; Owner: downtown
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" DEFAULT 'CLIENT'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO downtown;

--
-- Data for Name: Event; Type: TABLE DATA; Schema: public; Owner: downtown
--

COPY public."Event" (id, title, description, date, "imageUrl", "createdAt", "updatedAt", type) FROM stdin;
f38c1c78-86ac-4171-997f-8d8bf0cabceb	Torneo Nocturno	Evento especial 5 vs 5 a partir de las 20:00.	2025-08-25 23:00:00	https://example.com/nocturno.jpg	2025-07-16 19:09:29.264	2025-07-16 19:09:29.264	Torneo
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: downtown
--

COPY public."Payment" (id, status, amount, "transactionId", "createdAt", "reservationId") FROM stdin;
\.


--
-- Data for Name: Reservation; Type: TABLE DATA; Schema: public; Owner: downtown
--

COPY public."Reservation" (id, date, "time", status, "createdAt", "updatedAt") FROM stdin;
f7650dd2-b0b1-4782-a251-b61176bd939e	2025-07-25 00:00:00	18	pending	2025-07-16 11:49:18.622	2025-07-16 11:49:18.622
f5c1747b-ab34-4302-a654-88cb6dbab1dc	2025-07-24 00:00:00	11:00	pending	2025-07-16 12:48:19.628	2025-07-16 12:48:19.628
39167916-9b56-4870-8a1d-396c8b40dd01	2025-07-16 00:00:00	11:00	pending	2025-07-16 12:56:16.381	2025-07-16 12:56:16.381
bf22e4ce-1fcd-42a2-8b6d-2172b8c4baff	2025-07-26 00:00:00	15:00	pending	2025-07-16 13:00:34.875	2025-07-16 13:00:34.875
630c31da-f4ee-41e1-a3ca-02f9d8721298	2025-07-16 00:00:00	14:00	pending	2025-07-16 13:13:23.843	2025-07-16 13:13:23.843
cad2aec4-224e-4dc5-bc2c-c008e586c5da	2025-07-26 00:00:00	22:00	pending	2025-07-16 14:41:54.195	2025-07-16 14:41:54.195
e4105d94-e031-4684-a8ac-d9a9569b8529	2025-07-16 00:00:00	18:00	pending	2025-07-16 14:52:41.183	2025-07-16 14:52:41.183
d321dcc2-a12a-4298-b75f-fed3158fa497	2025-07-21 00:00:00	14:00	pending	2025-07-16 15:24:19.67	2025-07-16 15:24:19.67
ce114a33-ef38-406c-8ffe-2faa1277f888	2025-07-24 00:00:00	18:00	pending	2025-07-16 15:57:27.036	2025-07-16 15:57:27.036
c3a2b67a-8fa2-498b-86e8-0ec018048a23	2025-07-16 00:00:00	17:00	pending	2025-07-16 16:26:00.794	2025-07-16 16:26:00.794
51862a4a-e6f0-4076-aee0-e4f1f7f96870	2025-08-10 00:00:00	18:00	confirmated	2025-07-15 15:52:59.928	2025-07-15 16:30:03.317
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: downtown
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
379fd77c-75db-43fd-ae17-be0a100f7300	9afafd7ee6cb422d9c42b50b04bb6a066aa157e734ad1890b933f2a4bb74e2a7	2025-07-15 15:52:14.525321+00	20250715155214_init	\N	\N	2025-07-15 15:52:14.488248+00	1
8a55d4a6-f0b5-42db-8fc2-be865859da92	a44a0e038e966c8d0584b3a3684ed7d82714bda41c236c8c2045885e3a720de4	2025-07-16 00:03:52.018146+00	20250716000351_add_user_model	\N	\N	2025-07-16 00:03:51.992544+00	1
fb46f138-3b9e-49bb-a761-c51b2e7a309a	57e6181321da3452c9879b48bab830dbb0c6806ecf7ed88d2fddd50691c243d1	2025-07-16 19:00:25.626921+00	20250716190025_add_type_event	\N	\N	2025-07-16 19:00:25.612213+00	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: downtown
--

COPY public.users (id, name, email, password, role, "createdAt") FROM stdin;
ea628ae6-aa14-41f0-91c5-abe26eb6e6d8	Admin Hern├ín	admin@downtown.com	$2b$10$5Ew9KeHBbfrtkgOEiI3dfOZTAJ2waaOK.I7M6yJ3T0bU8La2Ol.RS	CLIENT	2025-07-16 00:06:52.277
ee75b263-e327-4818-a9ae-a9514c65509a	Admin Hern├ín	admin5@downtown.com	$2b$10$TPmPfvlAHYOFkWt4oy0XJer7PIw14aINDvtL1prAaB5zB.XaixkJ2	CLIENT	2025-07-16 00:07:43.67
4db611c8-4335-4262-8b11-91044ab42283	Admin Hern├ín	admin6@downtown.com	$2b$10$ei06BGhN1lvs.JxJgUmhpu6lawxakC5BhN/rsXUC3T8iz2Kghwx0y	ADMIN	2025-07-16 00:09:50.252
619b0991-25b4-4d8f-85c2-a3e86e864012	Admin Hern├ín	admin65@downtown.com	$2b$10$H9uWAsYVartw1N/uvqgqEuAi/Ha/Q.V7vALOhAGxjjTyKVRlfKM0u	ADMIN	2025-07-16 00:17:47.897
\.


--
-- Name: Event Event_pkey; Type: CONSTRAINT; Schema: public; Owner: downtown
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY (id);


--
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: downtown
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- Name: Reservation Reservation_pkey; Type: CONSTRAINT; Schema: public; Owner: downtown
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: downtown
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: downtown
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: Payment_reservationId_key; Type: INDEX; Schema: public; Owner: downtown
--

CREATE UNIQUE INDEX "Payment_reservationId_key" ON public."Payment" USING btree ("reservationId");


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: downtown
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: Payment Payment_reservationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: downtown
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES public."Reservation"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--


import { Persona } from "./persona";
import { Seguidor } from "./seguidor";

export interface Lider extends Persona{
    seguidores: Seguidor[] | null
}
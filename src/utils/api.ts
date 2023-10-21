

export const base_api = 'http://localhost:3000';
export const url_usuarios_autenticado =  `${base_api}/usuarios/autenticado`
export const url_login = `${base_api}/usuarios/login`; 
export const url_categorias = `${base_api}/categorias`; 
export const url_tasks = `${base_api}/tarefas`; 
export const url_update_task = `${base_api}/tarefas/:id`; 
export const url_finish_task = `${base_api}/tarefas/:id/concluir`; 
export const url_reopen_task = `${base_api}/tarefas/:id/reabrir`; 
export const url_add_task_tag = `${base_api}/tarefas/:id/etiquetas/:tag`; 

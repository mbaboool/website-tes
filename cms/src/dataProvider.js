import { createClient } from '@supabase/supabase-js';
import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const supabaseUrl = 'https://qfsfzrjpgrukferrelho.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const dataProvider = {
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        let query = supabase
            .from(resource)
            .select('*', { count: 'exact' })
            .range((page - 1) * perPage, page * perPage - 1)
            .order(field, { ascending: order === 'asc' });

        if (params.filter) {
            for (const key in params.filter) {
                if (params.filter[key] !== undefined && params.filter[key] !== null && params.filter[key] !== '') {
                    query = query.ilike(key, `%${params.filter[key]}%`);
                }
            }
        }

        const { data, count, error } = await query;

        if (error) {
            console.error('Error in getList:', error);
            throw new Error(error.message);
        }

        return {
            data: data || [],
            total: count || 0,
        };
    },

    getOne: async (resource, params) => {
        const { data, error } = await supabase
            .from(resource)
            .select('*')
            .eq('id', params.id)
            .single();

        if (error) {
            console.error('Error in getOne:', error);
            throw new Error(error.message);
        }

        return { data: data || {} };
    },

    getMany: async (resource, params) => {
        const { data, error } = await supabase
            .from(resource)
            .select('*')
            .in('id', params.ids);

        if (error) {
            console.error('Error in getMany:', error);
            throw new Error(error.message);
        }

        return { data: data || [] };
    },

    getManyReference: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        let query = supabase
            .from(resource)
            .select('*', { count: 'exact' })
            .range((page - 1) * perPage, page * perPage - 1)
            .order(field, { ascending: order === 'asc' })
            .eq(params.target, params.id);

        const { data, count, error } = await query;

        if (error) {
            console.error('Error in getManyReference:', error);
            throw new Error(error.message);
        }

        return {
            data: data || [],
            total: count || 0,
        };
    },

    update: async (resource, params) => {
        const { data, error } = await supabase
            .from(resource)
            .update(params.data)
            .eq('id', params.id)
            .single();

        if (error) {
            console.error('Error in update:', error);
            throw new Error(error.message);
        }

        return { data: data || params.previousData };
    },

    updateMany: async (resource, params) => {
        const { error } = await supabase
            .from(resource)
            .update(params.data)
            .in('id', params.ids);

        if (error) {
            console.error('Error in updateMany:', error);
            throw new Error(error.message);
        }

        return { data: params.ids };
    },

    create: async (resource, params) => {
        const { data, error } = await supabase
            .from(resource)
            .insert([params.data])
            .select()
            .single();

        if (error) {
            console.error('Error in create:', error);
            throw new Error(error.message);
        }

        return { data: { ...params.data, id: data?.id } };
    },

    delete: async (resource, params) => {
        const { data, error } = await supabase
            .from(resource)
            .delete()
            .eq('id', params.id)
            .single();

        if (error) {
            console.error('Error in delete:', error);
            throw new Error(error.message);
        }

        return { data: data || params.previousData };
    },

    deleteMany: async (resource, params) => {
        const { error } = await supabase
            .from(resource)
            .delete()
            .in('id', params.ids);

        if (error) {
            console.error('Error in deleteMany:', error);
            throw new Error(error.message);
        }

        return { data: params.ids };
    },
};

export default dataProvider;

type GetMutations<Module> = Module extends { mutations: infer M} ? M: never

// ts 4.1 新特性
type AddPrefix<Prefix, Keys> = `${Prefix & string}/${Keys & string}`

type GetSubModuleKeys<Module, Key> = Module extends { modules: infer SubModules }
    ? AddPrefix<Key, GetModulesMutationsKeys<SubModules>>
    : never

type GetModuleMutationsKeys<Module, Key> = 
    // 'cart/add' | 'cart | remove'
    AddPrefix<Key, keyof GetMutations<Module>> | 
    // 'cart/subCart/add'
    GetSubModuleKeys<Module, Key>
    
type GetModulesMutationsKeys<Modules> = {
    [K in keyof Modules]: GetModuleMutationsKeys<Modules, K>
}[keyof Modules]

type Action<Mutations, Modules> = keyof Mutations | GetModulesMutationsKeys<Modules>

type Store<Mutations, Modules> = {
    dispatch(actions: Action<Mutations, Modules>) : void
}

type VuexOptions<Mutations, Modules> = {
    mutations: Mutations,
    modules: Modules
}

declare function Vuex<Mutations, Modules>(options: VuexOptions<Mutations, Modules>): Store<Mutations, Modules>
const store = Vuex({
    mutations: {
        root(state, ) {},
    },

    modules: {
        cart: {
            mutations: {
                sell(state) {

                }
            },
            actions: {
                sell(store) {

                }
            },
            getter: {
                stock(state) {

                }
            },
        },
        user: {
            mutations: {
                login(state){}
            },
            modules: {
                admin: {
                    mutations: {
                        login(state){}
                    }
                }
            }
        }
    }
})

// test
store.dispatch('root')
store.dispatch('cart/add')
store.dispatch('user/login')
store.dispatch('user/admin/login')



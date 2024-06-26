import { types as t, Instance } from "mobx-state-tree";

const Todo = t
  .model("Todo", {
    name: t.optional(t.string, ""),
    done: t.optional(t.boolean, false),
  })
  .actions((self) => ({
    setName(name: string) {
      self.name = name;
    },
    toggle() {
      self.done = !self.done;
    },
  }))
  .views((self) => ({
    get status() {
      return self.done ? "bg-[#1da1f2]" : "bg-[#f43f5e]";
    },
  }));


const RootStore = t
  .model("RootStore", {
    todos: t.array(Todo),
  })
  .actions((self) => ({
    addTodo(name: string) {
      self.todos.push(Todo.create({ name: name }));
    },
    deleteTodo(id: number) {
      self.todos.splice(id, 1);
    },
  }));


export type TodoTypes = Instance<typeof Todo>;
export const store = RootStore.create({
  todos: [],
});

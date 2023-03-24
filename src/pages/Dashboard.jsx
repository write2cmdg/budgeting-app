// rrd imports
import { Link, useLoaderData } from "react-router-dom";

//library imports
import { toast } from "react-toastify";

//Components
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Intro from "../components/Intro";
import Table from "../components/Table";

//  helper functions
import { createBudget, createExpense, deleteItem, fetchData, waait } from "../helpers"

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses }
}
 
//action
export async function dashboardAction({request}) {
  //random delay function
  await waait()

  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data)

  //new user submission
  if(_action==="newUser"){
    try {
      //throw new Error('Big Trouble')
      localStorage.setItem("userName", JSON.stringify(values.userName))
      return toast.success(`Welcome, ${values.userName}.`)
    } catch (e) {
      throw new Error("There was a problem creating your account.")
    }
  }
  if(_action==="createBudget"){
    try {
    //create Budget
    createBudget({
      name: values.newBudget, 
      amount: values.newBudgetAmount,
    })
      return toast.success(`Budget Created`)
    } catch (e) {
      throw new Error("There was a problem creating your budget.")
    }
  }

  if(_action==="createExpense"){
    try {
    //create Expense
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget
      })

      return toast.success(`Expense entry for ${values.newExpense} CREATED!`)
    } catch (e) {
      throw new Error("There was a problem creating your Expense.")
    }
  }
  if(_action==="deleteExpense"){
    try {
    //create Expense
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      })

      return toast.success(`Expense Entry has been DELETED!`)
    } catch (e) {
      throw new Error("There was a problem deleting your Expense.")
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData()

  return (
    <>
      {userName ? (
      <div className="dashboard">
        <h1>Welcome back, <span className="accent">{userName}.</span></h1>
        <div className="grid-sm">
          {
            budgets && budgets.length > 0 ? (
                <div className="grid-lg">
                  <div className="flex-lg">
                    <AddBudgetForm />
                    <AddExpenseForm budgets={budgets} />
                  </div>
                  <h2>Existing Budgets</h2>
                  <div className="budgets">
                    {
                      budgets.map((budget) => (
                        <BudgetItem key={budget.id} budget={budget} />
                      ))
                    }
                  </div>
                    {
                      expenses && expenses.length > 0 && (
                        <div className="grid-md">
                          <h2>Recent Expenses</h2>
                          <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 6)} />
                          {
                            expenses.length > 6 && (
                              <Link
                              to="expenses"
                              className="btn btn--dark">View All Expenses</Link>
                            )
                          }
                        </div>
                      )
                    }
                </div>
              ) : (
                <div className="grid-sm">
                  <p>Personal budgeting is the key to financial freedom.</p>
                  <p>Create a budget to get started.</p>
                  <AddBudgetForm />
                </div>
              )
          }
        </div>
      </div>  
      ) : <Intro />}
    </>
  )
}
export default Dashboard
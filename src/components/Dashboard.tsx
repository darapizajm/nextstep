import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import { DollarSign, CheckSquare, Clock, Calendar, AlertCircle, TrendingUp, TrendingDown, Target } from "./icons"
import { SimplePieChart, SimpleLineChart } from "./simple-charts"

interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  category: string
  description: string
  date: string
}

interface Task {
  id: string
  title: string
  description: string
  category: "academic" | "personal"
  priority: "low" | "medium" | "high"
  dueDate: string
  completed: boolean
  createdAt: string
}

interface AttendanceRecord {
  id: string
  date: string
  subject: string
  scheduledTime: string
  actualTime: string
  status: "on-time" | "late" | "absent"
  notes?: string
}

interface DashboardProps {
  transactions: Transaction[]
  tasks: Task[]
  attendanceRecords: AttendanceRecord[]
  userName?: string
}

const COLORS = ["#6b3cc9", "#7c4dff", "#9d6fdb", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"]

export function Dashboard({ transactions, tasks, attendanceRecords, userName = "Student" }: DashboardProps) {
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      },
      {} as Record<string, number>,
    )

  const totalExpenseAmount = Object.values(expensesByCategory).reduce((sum, val) => sum + val, 0)

  const budgetData = Object.entries(expensesByCategory).map(([category, amount], index) => ({
    name: category,
    value: totalExpenseAmount > 0 ? Math.round((amount / totalExpenseAmount) * 100) : 0,
    amount: amount,
    color: COLORS[index % COLORS.length],
  }))

  const completedTasks = tasks.filter((t) => t.completed).length
  const totalTasks = tasks.length
  const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const onTimeCount = attendanceRecords.filter((r) => r.status === "on-time").length
  const totalAttendance = attendanceRecords.filter((r) => r.status !== "absent").length
  const punctualityRate = totalAttendance > 0 ? Math.round((onTimeCount / totalAttendance) * 100) : 0

  const today = new Date()
  const nextWeek = new Date(today)
  nextWeek.setDate(today.getDate() + 7)

  const upcomingTasks = tasks
    .filter((task) => {
      const dueDate = new Date(task.dueDate)
      return dueDate >= today && dueDate <= nextWeek && !task.completed
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())

  const weeklyPunctuality = attendanceRecords.reduce(
    (acc, record) => {
      const date = new Date(record.date)
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay())
      const weekKey = weekStart.toISOString().split("T")[0]

      if (!acc[weekKey]) {
        acc[weekKey] = { onTime: 0, total: 0 }
      }

      if (record.status !== "absent") {
        acc[weekKey].total++
        if (record.status === "on-time") {
          acc[weekKey].onTime++
        }
      }

      return acc
    },
    {} as Record<string, { onTime: number; total: number }>,
  )

  const punctualityData = Object.entries(weeklyPunctuality)
    .map(([week, data]) => ({
      week: new Date(week).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      rate: data.total > 0 ? Math.round((data.onTime / data.total) * 100) : 0,
    }))
    .slice(-6)

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold">Welcome back, {userName}! 👋</h1>
          <p className="text-muted-foreground text-base">Here's your progress overview for today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{balance.toFixed(2)}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              {balance >= 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-600">Positive balance</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-destructive" />
                  <span className="text-destructive">Negative balance</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Completion</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedTasks}/{totalTasks}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-600">{taskCompletionRate}% complete</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Punctuality Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{punctualityRate}%</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-600">{onTimeCount} on-time</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskCompletionRate}%</div>
            <Progress value={taskCompletionRate} className="mt-3" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="h-5 w-5" />
              Budget Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            {budgetData.length > 0 ? (
              <>
                <SimplePieChart data={budgetData} />
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {budgetData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 min-w-0">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-sm truncate">{item.name}</span>
                      <span className="text-sm text-muted-foreground ml-auto whitespace-nowrap">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No expense data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckSquare className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Income</span>
                  <span className="text-sm text-green-600 font-semibold">₱{totalIncome.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Expenses</span>
                  <span className="text-sm text-destructive font-semibold">₱{totalExpenses.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-sm font-medium">Balance</span>
                  <span className={`text-sm font-semibold ${balance >= 0 ? "text-green-600" : "text-destructive"}`}>
                    ₱{balance.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-2 border-t pt-4">
                <p className="text-sm font-medium">Recent Transactions</p>
                {transactions
                  .slice(-5)
                  .reverse()
                  .map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between text-sm gap-2">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Badge
                          variant={transaction.type === "income" ? "default" : "secondary"}
                          className="flex-shrink-0"
                        >
                          {transaction.type}
                        </Badge>
                        <span className="text-muted-foreground truncate">{transaction.category}</span>
                      </div>
                      <span
                        className={`whitespace-nowrap font-semibold ${transaction.type === "income" ? "text-green-600" : "text-destructive"}`}
                      >
                        {transaction.type === "income" ? "+" : "-"}₱{transaction.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border/50 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5" />
              Punctuality Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            {punctualityData.length > 0 ? (
              <SimpleLineChart data={punctualityData} />
            ) : (
              <div className="h-48 flex items-center justify-center text-muted-foreground">
                No punctuality data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {balance < 0 && (
                <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-yellow-800 dark:text-yellow-600 font-medium">Budget Alert</p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-500">Negative balance detected</p>
                  </div>
                </div>
              )}

              {upcomingTasks.length > 0 && (
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                  <Calendar className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-blue-800 dark:text-blue-600 font-medium">Upcoming Deadline</p>
                    <p className="text-xs text-blue-600 dark:text-blue-500 truncate">{upcomingTasks[0].title}</p>
                  </div>
                </div>
              )}

              {punctualityRate >= 90 && (
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
                  <Target className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-green-800 dark:text-green-600 font-medium">Great Punctuality!</p>
                    <p className="text-xs text-green-600 dark:text-green-500">{punctualityRate}% on-time rate</p>
                  </div>
                </div>
              )}

              {balance < 0 && upcomingTasks.length === 0 && punctualityRate < 90 && (
                <div className="flex items-center justify-center text-muted-foreground text-sm py-4">
                  No alerts at the moment
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

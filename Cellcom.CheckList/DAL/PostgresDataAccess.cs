using Npgsql;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;
using NpgsqlTypes;
using Cellcom.CheckList.Entities.Enums;
using Microsoft.Extensions.Configuration;
using Cellcom.CheckList.Entities.AppSettings;
using Cellcom.CheckList.Models;

namespace Cellcom.CheckList.DAL
{
    public class PostgresDataAccess : IDataAccess
    {
        private readonly IConfiguration _config;
        private readonly ConnectionString _connectionStringConfigs;
        private readonly string _connectionString;


        public PostgresDataAccess(IConfiguration configuration)
        {
            _config = configuration;
            _connectionStringConfigs = _config.GetSection("ConnectionString").Get<ConnectionString>();
            _connectionString = _connectionStringConfigs.PostreSQL;
        }


        // Shifts
        public async Task<DataTable> GetShifts()
        {
            DataTable dataTable = await ExecuteNonQuery("public.fn_get_shifts");
            return dataTable;
        }

        public async Task<int> CreateShift(string name, TimeSpan fromTime, TimeSpan toTime)
        {
            List<NpgsqlParameter> parameters = new List<NpgsqlParameter>
            {
                new NpgsqlParameter { ParameterName = "_name",   NpgsqlValue = name, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_from_time",   NpgsqlValue = fromTime, NpgsqlDbType = NpgsqlDbType.Time},
                new NpgsqlParameter { ParameterName = "_to_time",   NpgsqlValue = toTime, NpgsqlDbType = NpgsqlDbType.Time}
            };

            int returnId = await ExecuteScalar("public.fn_insert_shift", parameters);
            return returnId;
        }

        public async Task<int> UpdateShift(int id, string name, TimeSpan fromTime, TimeSpan toTime)
        {
            List<NpgsqlParameter> parameters = new List<NpgsqlParameter>
            {
                new NpgsqlParameter { ParameterName = "_id",   NpgsqlValue = id, NpgsqlDbType = NpgsqlDbType.Integer},
                new NpgsqlParameter { ParameterName = "_name",   NpgsqlValue = name, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_from_time",   NpgsqlValue = fromTime, NpgsqlDbType = NpgsqlDbType.Time},
                new NpgsqlParameter { ParameterName = "_to_time",   NpgsqlValue = toTime, NpgsqlDbType = NpgsqlDbType.Time}
            };

            int returnId = await ExecuteScalar("public.fn_update_shift", parameters);
            return returnId;
        }

        public async Task<int> DeleteShift(int id)
        {
            List<NpgsqlParameter> parameters = new List<NpgsqlParameter>();
            parameters.Add(new NpgsqlParameter("_id", id));

            int returnId = await ExecuteScalar("public.fn_delete_shift", parameters);
            return returnId;

        }

        public async Task<int> SetActiveShift(int id)
        {
            List<NpgsqlParameter> parameters = new List<NpgsqlParameter>();
            parameters.Add(new NpgsqlParameter("_id", id));

            int returnId = await ExecuteScalar("public.fn_set_active_shift", parameters);
            return returnId;
        }


        // External links
        public async Task<DataTable> GetExternalLinks()
        {
            DataTable dataTable = await ExecuteNonQuery("public.fn_get_external_links");
            return dataTable;
        }


        // Tasks
        public async Task<int> CreateTask(Models.Task task)
        {
            string name = task.Name;
            string details = task.Details;
            string procedureLink = task.ProcedureLink;
            int shiftId = task.Shift.Id;
            string shiftName = task.Shift.Name;
            string timingType = task.TimingType.ToString();
            TimeSpan startTime = task.StartTime;
            bool isDisabled = task.IsDisabled;
            string status = ETaskStatus.PENDING.ToString();
            string timingValues = "";
            DateTime? timingOneTimeDate = task.TimingOneTimeDate;

            switch (task.TimingType)
            {
                case ETaskTimingType.DAILY:
                    break;
                case ETaskTimingType.ONE_TIME:
                    timingOneTimeDate.Value.Add(task.StartTime);
                    break;
                case ETaskTimingType.WEEKLY:
                    timingValues = task.TimingValues.ToString();
                    break;
                case ETaskTimingType.MOUNTLY:
                    timingValues = string.Join(",", task.TimingValues);
                    break;
                default:
                    break;
            }

            List<NpgsqlParameter> parameters = new List<NpgsqlParameter>
            {
                new NpgsqlParameter { ParameterName = "_name", NpgsqlValue = name, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_details", NpgsqlValue = details, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_procedure_link", NpgsqlValue = procedureLink, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_shift_id", NpgsqlValue = shiftId, NpgsqlDbType = NpgsqlDbType.Integer},
                new NpgsqlParameter { ParameterName = "_shift_name", NpgsqlValue = shiftName, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_timing_type", NpgsqlValue = timingType, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_timing_values", NpgsqlValue = timingValues, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_start_time", NpgsqlValue = startTime, NpgsqlDbType = NpgsqlDbType.Time},
                new NpgsqlParameter { ParameterName = "_is_disabled", NpgsqlValue = isDisabled, NpgsqlDbType = NpgsqlDbType.Boolean},
                new NpgsqlParameter { ParameterName = "_status", NpgsqlValue = status, NpgsqlDbType = NpgsqlDbType.Varchar}
            };

            if (task.TimingType == ETaskTimingType.ONE_TIME && timingOneTimeDate != null)
            {
                parameters.Add(new NpgsqlParameter { ParameterName = "_timing_one_time_date", NpgsqlValue = timingOneTimeDate, NpgsqlDbType = NpgsqlDbType.Timestamp });
            }


            int returnId = await ExecuteScalar("public.fn_insert_task", parameters);
            return returnId;
        }

        public async Task<int> UpdateTask(Models.Task task)
        {
            int taskId = task.Id;
            string name = task.Name;
            string details = task.Details;
            string procedureLink = task.ProcedureLink;
            int shiftId = task.Shift.Id;
            string shiftName = task.Shift.Name;
            string timingType = task.TimingType.ToString();
            TimeSpan startTime = task.StartTime;
            bool isDisabled = task.IsDisabled;
            string status = ETaskStatus.PENDING.ToString();
            string timingValues = "";
            DateTime? timingOneTimeDate = task.TimingOneTimeDate;

            switch (task.TimingType)
            {
                case ETaskTimingType.DAILY:
                    break;
                case ETaskTimingType.ONE_TIME:
                    timingOneTimeDate.Value.Add(task.StartTime);
                    break;
                case ETaskTimingType.WEEKLY:
                    timingValues = task.TimingValues.ToString();
                    break;
                case ETaskTimingType.MOUNTLY:
                    timingValues = string.Join(",", task.TimingValues);
                    break;
                default:
                    break;
            }

            List<NpgsqlParameter> parameters = new List<NpgsqlParameter>
            {
                new NpgsqlParameter { ParameterName = "_id", NpgsqlValue = taskId, NpgsqlDbType = NpgsqlDbType.Integer},
                new NpgsqlParameter { ParameterName = "_name", NpgsqlValue = name, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_details", NpgsqlValue = details, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_procedure_link", NpgsqlValue = procedureLink, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_shift_id", NpgsqlValue = shiftId, NpgsqlDbType = NpgsqlDbType.Integer},
                new NpgsqlParameter { ParameterName = "_shift_name", NpgsqlValue = shiftName, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_timing_type", NpgsqlValue = timingType, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_timing_values", NpgsqlValue = timingValues, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_start_time", NpgsqlValue = startTime, NpgsqlDbType = NpgsqlDbType.Time},
                new NpgsqlParameter { ParameterName = "_is_disabled", NpgsqlValue = isDisabled, NpgsqlDbType = NpgsqlDbType.Boolean},
            };

            if (task.TimingType == ETaskTimingType.ONE_TIME && timingOneTimeDate != null)
            {
                parameters.Add(new NpgsqlParameter { ParameterName = "_timing_one_time_date", NpgsqlValue = timingOneTimeDate, NpgsqlDbType = NpgsqlDbType.Timestamp });
            }


            int returnId = await ExecuteScalar("public.fn_update_task", parameters);
            return returnId;
        }

        public async Task<DataTable> GetTask(int taskId)
        {
            List<NpgsqlParameter> parameters = new List<NpgsqlParameter>
            {
                new NpgsqlParameter { ParameterName = "_id",  NpgsqlValue = taskId, NpgsqlDbType = NpgsqlDbType.Integer},
            };

            DataTable dataTable = await ExecuteNonQuery("public.fn_get_task", parameters);
            return dataTable;
        }

        public async Task<DataTable> GetTasks(bool isDisabled = false, bool isDeleted = false, bool isOneTimeTasks = false)
        {
            List<NpgsqlParameter> parameters = new List<NpgsqlParameter>
            {
                new NpgsqlParameter { ParameterName = "_is_disabled", NpgsqlValue = isDisabled, NpgsqlDbType = NpgsqlDbType.Boolean},
                new NpgsqlParameter { ParameterName = "_is_deleted", NpgsqlValue = isDeleted, NpgsqlDbType = NpgsqlDbType.Boolean},
                new NpgsqlParameter { ParameterName = "_is_one_time_tasks", NpgsqlValue = isOneTimeTasks, NpgsqlDbType = NpgsqlDbType.Boolean},
            };

            DataTable dataTable = await ExecuteNonQuery("public.fn_get_tasks", parameters);
            return dataTable;
        }

        public async Task<DataTable> GetUserTasks(int shiftId)
        {
            List<NpgsqlParameter> parameters = new List<NpgsqlParameter>
            {
                new NpgsqlParameter { ParameterName = "_shift_id", NpgsqlValue = shiftId, NpgsqlDbType = NpgsqlDbType.Integer},
            };

            DataTable dataTable = await ExecuteNonQuery("public.fn_get_user_tasks", parameters);
            return dataTable;
        }

        public async Task<int> ResetTasks(int shiftId)
        {
            List<NpgsqlParameter> parameters = new List<NpgsqlParameter>();
            parameters.Add(new NpgsqlParameter("_shift_id", shiftId));

            int returnId = await ExecuteScalar("public.fn_reset_tasks", parameters);
            return returnId;
        }

        public async Task<int> DeleteTask(int id)
        {
            List<NpgsqlParameter> parameters = new List<NpgsqlParameter>();
            parameters.Add(new NpgsqlParameter("_id", id));

            int returnId = await ExecuteScalar("public.fn_delete_task", parameters);
            return returnId;
        }

        public async Task<int> RestoreTask(int id)
        {
            List<NpgsqlParameter> parameters = new List<NpgsqlParameter>();
            parameters.Add(new NpgsqlParameter("_id", id));

            int returnId = await ExecuteScalar("public.fn_restore_task", parameters);
            return returnId;
        }

        public async Task<int> SetTaskStatus(int id, ETaskStatus status)
        {
            List<NpgsqlParameter> parameters = new List<NpgsqlParameter>();
            parameters.Add(new NpgsqlParameter("_id", id));
            parameters.Add(new NpgsqlParameter("_status", status.ToString()));

            int returnId = await ExecuteScalar("public.fn_set_task_status", parameters);
            return returnId;
        }

        public async Task<int> SetTaskComments(int id, string comments)
        {
            List<NpgsqlParameter> parameters = new List<NpgsqlParameter>();
            parameters.Add(new NpgsqlParameter("_id", id));
            parameters.Add(new NpgsqlParameter("_comments", comments));

            int returnId = await ExecuteScalar("public.fn_set_task_comments", parameters);
            return returnId;
        }

        public async Task<int> CreateOneTimeTask(DateTime startDate, TimeSpan startTime, Shift shift, string taskName, string taskDetails, string comments, ETaskTimingType timingType, ETaskStatus status)
        {
            List<NpgsqlParameter> parameters = new List<NpgsqlParameter>
            {
                new NpgsqlParameter { ParameterName = "_name", NpgsqlValue = taskName, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_details", NpgsqlValue = taskDetails, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_shift_id", NpgsqlValue = shift.Id, NpgsqlDbType = NpgsqlDbType.Integer},
                new NpgsqlParameter { ParameterName = "_shift_name", NpgsqlValue = shift.Name, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_timing_type", NpgsqlValue = timingType.ToString(), NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_start_time", NpgsqlValue = startTime, NpgsqlDbType = NpgsqlDbType.Time},
                new NpgsqlParameter { ParameterName = "_comments", NpgsqlValue = comments, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_status", NpgsqlValue = status.ToString(), NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_timing_one_time_date", NpgsqlValue = startDate, NpgsqlDbType = NpgsqlDbType.Timestamp}
            };

            int returnId = await ExecuteScalar("public.fn_insert_one_time_task", parameters);
            return returnId;
        }

        public async Task<int> UpdateOneTimeTask(int taskId, DateTime startDate, TimeSpan startTime, Shift shift, string taskName, string taskDetails, string comments, ETaskTimingType timingType, ETaskStatus status)
        {
            List<NpgsqlParameter> parameters = new List<NpgsqlParameter>
            {
                new NpgsqlParameter { ParameterName = "_id", NpgsqlValue = taskId, NpgsqlDbType = NpgsqlDbType.Integer},
                new NpgsqlParameter { ParameterName = "_name", NpgsqlValue = taskName, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_details", NpgsqlValue = taskDetails, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_shift_id", NpgsqlValue = shift.Id, NpgsqlDbType = NpgsqlDbType.Integer},
                new NpgsqlParameter { ParameterName = "_shift_name", NpgsqlValue = shift.Name, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_timing_type", NpgsqlValue = timingType.ToString(), NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_start_time", NpgsqlValue = startTime, NpgsqlDbType = NpgsqlDbType.Time},
                new NpgsqlParameter { ParameterName = "_comments", NpgsqlValue = comments, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_status", NpgsqlValue = status.ToString(), NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_timing_one_time_date", NpgsqlValue = startDate, NpgsqlDbType = NpgsqlDbType.Timestamp}
            };

            int returnId = await ExecuteScalar("public.fn_update_one_time_task", parameters);
            return returnId;
        }

        public async Task<DataTable> GetTasksLog(DateTime date, int shiftId)
        {
            List<NpgsqlParameter> parameters = new List<NpgsqlParameter>
            {
                new NpgsqlParameter { ParameterName = "_date", NpgsqlValue = date, NpgsqlDbType = NpgsqlDbType.Timestamp},
                new NpgsqlParameter { ParameterName = "_shift_id", NpgsqlValue = shiftId, NpgsqlDbType = NpgsqlDbType.Integer},
            };

            DataTable dataTable = await ExecuteNonQuery("public.fn_get_tasks_log", parameters);
            return dataTable;        
        }

        public async Task<int> SetTaskLog(TaskLog taskLog)
        {
            List<NpgsqlParameter> parameters = new List<NpgsqlParameter>
            {
                new NpgsqlParameter { ParameterName = "_task_id", NpgsqlValue = taskLog.TaskId, NpgsqlDbType = NpgsqlDbType.Integer},
                new NpgsqlParameter { ParameterName = "_name", NpgsqlValue = taskLog.Name, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_details", NpgsqlValue = taskLog.Details, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_procedure_link", NpgsqlValue = taskLog.ProcedureLink, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_shift_id", NpgsqlValue = taskLog.ShiftId, NpgsqlDbType = NpgsqlDbType.Integer},
                new NpgsqlParameter { ParameterName = "_shift_time_from", NpgsqlValue = taskLog.ShiftTimeFrom, NpgsqlDbType = NpgsqlDbType.Time},
                new NpgsqlParameter { ParameterName = "_shift_time_to", NpgsqlValue = taskLog.ShiftTimeTo, NpgsqlDbType = NpgsqlDbType.Time},
                new NpgsqlParameter { ParameterName = "_shift_name", NpgsqlValue = taskLog.ShiftName, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_timing_type", NpgsqlValue = taskLog.TimingType.ToString(), NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_timing_values", NpgsqlValue = taskLog.TimingValues.ToString(), NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_timing_one_time_date", NpgsqlValue = taskLog.TimingOneTimeDate ?? (object)DBNull.Value, NpgsqlDbType = NpgsqlDbType.Timestamp},
                new NpgsqlParameter { ParameterName = "_start_time", NpgsqlValue = taskLog.StartTime, NpgsqlDbType = NpgsqlDbType.Time},
                new NpgsqlParameter { ParameterName = "_comments", NpgsqlValue = taskLog.Comments, NpgsqlDbType = NpgsqlDbType.Varchar},
                new NpgsqlParameter { ParameterName = "_status", NpgsqlValue = taskLog.Status.ToString(), NpgsqlDbType = NpgsqlDbType.Varchar},
            };

            int returnId = await ExecuteScalar("public.fn_insert_task_log", parameters);
            return returnId;        
        }



        // Helpers
        private async Task<DataTable> ExecuteNonQuery(string functionName, List<NpgsqlParameter> parameters)
        {
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                try
                {
                    conn.Open();

                    var cmd = new NpgsqlCommand(functionName, conn)
                    {
                        CommandType = CommandType.StoredProcedure,
                        CommandTimeout = 30
                    };

                    if (parameters != null && parameters.Any())
                    {
                        foreach (var item in parameters)
                        {
                            cmd.Parameters.Add(item);
                        }
                    }

                    DataTable dataTable = new DataTable();
                    NpgsqlDataAdapter dataAdapter = new NpgsqlDataAdapter(cmd);

                    await Task.Run(() => dataAdapter.Fill(dataTable));

                    return dataTable;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }
                }
            }
        }

        private async Task<DataTable> ExecuteNonQuery(string functionName)
        {
            return await ExecuteNonQuery(functionName, null);
        }

        private async Task<int> ExecuteScalar(string functionName, List<NpgsqlParameter> parameters)
        {
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                try
                {
                    conn.Open();

                    var cmd = new NpgsqlCommand(functionName, conn)
                    {
                        CommandType = CommandType.StoredProcedure,
                        CommandTimeout = 30
                    };

                    if (parameters != null && parameters.Any())
                    {
                        foreach (var item in parameters)
                        {
                            cmd.Parameters.Add(item);
                        }
                    }

                    int returnValue = (int)await cmd.ExecuteScalarAsync();
                    return returnValue;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }
                }
            }
        }

        private async Task<int> ExecuteScalar(string functionName)
        {
            return await ExecuteScalar(functionName, null);
        }

    }
}

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Text.RegularExpressions;

namespace Wox.Plugin.GraphicalTimer
{
    class Main : IPlugin
    {
        string assemblyFolder = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
        Regex rx = new Regex(@"^(\d+):?(\d*)$", RegexOptions.Compiled | RegexOptions.IgnoreCase);
        public void Init(PluginInitContext context) { }
        public List<Result> Query(Query query)
        {
            MatchCollection matches = rx.Matches(query.Search);
            if (matches.Count < 1)
            {
                return new List<Result>
                {
                    new Result
                    {
                        Title = $"Bad time format",
                        IcoPath = "timeIcon.png",
                        Action = _ =>
                        {
                            return true;
                        }
                    }
                };
            }
            Match match = matches[0];
            GroupCollection groups = match.Groups;
            String sec = (groups[2].Value == "" ? "0" : groups[2].Value);
            return new List<Result>
            {
                new Result
                {
                    Title = $"Set timer for {groups[1].Value}m {sec}s",
                    IcoPath = "timeIcon.png",
                    Action = _ =>
                    {
                        var process = new Process
                        {
                            StartInfo = new ProcessStartInfo
                            {
                                FileName = assemblyFolder + "/electron/wox-timer.exe",
                                Arguments = $"-- -t {Int32.Parse(groups[1].Value) * 60 + Int32.Parse(sec)}",
                                UseShellExecute = true
                                // CreateNoWindow = true
                            }
                        };
                        process.Start();
                        return true;
                    }
                }
            };
        }
    }
}
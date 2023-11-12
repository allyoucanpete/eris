using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Eris.Server.Hubs;
using Eris.Shared.Models;
using Eris.Shared.Models.Request;

namespace Eris.Server.Controllers;

[ApiController]
[Route("api/netflix")]
public class NetflixController : ControllerBase
{
    private readonly IHubContext<NetflixHub, INetflixClient> _hub;
    private readonly ILogger<NetflixController> _logger;

    public NetflixController(IHubContext<NetflixHub, INetflixClient> hub, ILogger<NetflixController> logger)
    {
        _hub = hub;
        _logger = logger;
    }

    [HttpPost("back")]
    public async Task Back()
    {
        _logger.LogInformation("Back");
        await _hub.Clients.All.Back();
    }

    [HttpPost("forward")]
    public async Task Forward()
    {
        _logger.LogInformation("Forward");
        await _hub.Clients.All.Forward();
    }

    [HttpPost("pause")]
    public async Task Pause()
    {
        _logger.LogInformation("Pause");
        await _hub.Clients.All.Pause();
    }

    [HttpPost("play")]
    public async Task Play()
    {
        _logger.LogInformation("Play");
        await _hub.Clients.All.Play();
    }

    [HttpPut("seek")]
    public async Task Seek([FromBody] SeekRequest request)
    {
        _logger.LogInformation("Seek: {}", request.Position);
        await _hub.Clients.All.Seek(request.Position);
    }

    [HttpPut("volume")]
    public async Task Volume([FromBody] VolumeRequest request)
    {
        _logger.LogInformation("Volume: {}", request.Volume);
        var volume  = Math.Clamp(value: request.Volume, min: 0, max: 100);
        await _hub.Clients.All.Volume(volume);
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Eris.Shared;

namespace Eris.Server.Controllers;

[ApiController]
[Route("api/netflix")]
public class NetflixController : ControllerBase
{
    private readonly ILogger<NetflixController> _logger;

    public NetflixController(ILogger<NetflixController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public PlaybackStatus Get()
    {
        return new PlaybackStatus(IsPlaying: true);
    }

    [HttpPut("pause")]
    public PlaybackStatus Pause()
    {
        return new PlaybackStatus(IsPlaying: false);
    }

    [HttpPut("play")]
    public PlaybackStatus Play()
    {
        return new PlaybackStatus(IsPlaying: true);
    }
}

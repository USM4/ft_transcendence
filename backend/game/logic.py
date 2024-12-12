
class Game:
    def __init__(self):
        self.paddle1 = {"x": 50, "y": 100, "width": 10, "height": 100}
        self.paddle2 = {"x": 740, "y": 200, "width": 10, "height": 100}
        self.ball = {"x": 400, "y": 300, "radius": 10, "dx": 5, "dy": 5}
        self.canvas_width = 800
        self.canvas_height = 600

    def update(self):
        # Move the ball
        self.ball["x"] += self.ball["dx"]
        self.ball["y"] += self.ball["dy"]

        # Check for collisions with walls
        if self.ball["y"] - self.ball["radius"] <= 0 or self.ball["y"] + self.ball["radius"] >= self.canvas_height:
            self.ball["dy"] *= -1

        if self.ball["x"] - self.ball["radius"] <= 0 or self.ball["x"] + self.ball["radius"] >= self.canvas_width:
            self.ball["dx"] *= -1

        if self.ball["x"] - self.ball["radius"] <= self.paddle1["x"] and self.paddle1["y"] <= self.ball["y"] <= self.paddle1["y"] + self.paddle1["height"]:
            self.ball["dx"] *= -1
        
        if self.ball["x"] + self.ball["radius"] >= self.paddle2["x"] and self.paddle2["y"] <= self.ball["y"] <= self.paddle2["y"] + self.paddle2["height"]:
            self.ball["dx"] *= -1

    def get_state(self):
        return {
            "paddle1": self.paddle1,
            "paddle2": self.paddle2,
            "ball": self.ball,
        }

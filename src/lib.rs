use std::fmt::format;
use wasm_bindgen::prelude::*;

fn log(s: impl Into<JsValue>) {
    web_sys::console::log_1(&s.into());
}

#[wasm_bindgen]
pub struct FrameCalc {
    buffer: Vec<u8>,
    x: f64,
    t: f64,
    v: f64,
}

#[wasm_bindgen]
impl FrameCalc {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            buffer: vec![],
            x: 0.0,
            t: 0.0,
            v: 0.0,
        }
    }

    fn coord_to_index(canvas_width: usize, x: usize, y: usize) -> Option<usize> {
        let idx = 4 * (y * canvas_width + x);
        if idx < canvas_width * canvas_width * 4 {
            return Some(idx);
        }
        None
    }

    pub fn pixel_area(
        canvas_width: usize,
        x_coord: usize,
        y_coord: usize,
        mut radius: isize,
    ) -> Vec<usize> {
        let (x_coord, y_coord) = (x_coord as isize, y_coord as isize);
        radius -= 1;

        let mut res = vec![];
        for i in -radius..radius + 1 {
            for j in -radius..radius + 1 {
                let (x, y) = (x_coord + j, y_coord + i);
                if x < 0 || y < 0 {
                    continue;
                }
                if let Some(red_idx) = Self::coord_to_index(canvas_width, x as usize, y as usize) {
                    res.push(red_idx);
                }
            }
        }

        res
    }

    pub fn compute_frame(
        &mut self,
        canvas_width: usize,
        n: usize,
        speed: f64,
        tau_div: f64,
        px_size: isize,
        red: f64,
        green: f64,
        blue: f64,
    ) -> *const u8 {
        self.buffer = vec![0; canvas_width * canvas_width * 4];
        let r = std::f64::consts::TAU / tau_div;

        for i in 0..n {
            let i = i as f64;
            for j in 0..n {
                let j = j as f64;

                let u = (i + self.v).sin() + (r * i + self.x).sin();
                self.v = (i + self.v).cos() + (r * i + self.x).cos();
                self.x = u + self.t;

                let width_half = canvas_width as f64 / 2.0;
                let width_quart = width_half / 2.0;
                let max = canvas_width as f64 - 1.0;
                let x_pos = (u * width_quart + width_half).clamp(0.0, max);
                let y_pos = (self.v * width_quart + width_half).clamp(0.0, max);

                for red_idx in
                    Self::pixel_area(canvas_width, x_pos as usize, y_pos as usize, px_size)
                {
                    self.buffer[red_idx] = (i * red) as u8;
                    self.buffer[red_idx + 1] = (j * green) as u8;
                    self.buffer[red_idx + 2] = blue as u8;
                    self.buffer[red_idx + 3] = 255;
                }
            }
        }

        self.t += 0.025 * speed;
        self.buffer.as_ptr()
    }
}
